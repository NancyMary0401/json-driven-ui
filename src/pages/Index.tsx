import React, { useState } from 'react';
import { JsonEditor } from '@/components/JsonEditor';
import { UIRenderer } from '@/components/ui-renderer/UIRenderer';
import { PageConfig } from '@/types/ui-config';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Eye, Palette, Zap, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [jsonValue, setJsonValue] = useState('');
  const [parsedConfig, setParsedConfig] = useState<PageConfig | null>(null);
  const [error, setError] = useState<string>('');

  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    setError('');
  };

  const handleJsonParse = (parsed: any) => {
    try {
      if (parsed.type !== 'page') {
        throw new Error('Root element must have type "page"');
      }
      
      if (!parsed.elements || !Array.isArray(parsed.elements)) {
        throw new Error('Page must have an "elements" array');
      }
      
      setParsedConfig(parsed);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setParsedConfig(null);
    }
  };

  const handleAction = (action: string, data?: any) => {
    toast({
      title: "Action Triggered",
      description: `Action: ${action}${data ? ` | Data: ${JSON.stringify(data)}` : ''}`,
    });
    console.log('Action triggered:', action, data);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Server-Driven UI Renderer
              </h1>
              <p className="text-muted-foreground mt-2">
                Transform JSON configurations into dynamic user interfaces
              </p>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Real-time
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                Themed
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Card */}
        <Card className="mb-8 border-info/20 bg-info/5">
          <CardHeader>
            <CardTitle className="flex items-center text-info">
              <Info className="h-5 w-5 mr-2" />
              How it Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              This demonstrates a server-driven UI system where JSON configurations are converted into 
              fully functional user interfaces. Define your UI structure in JSON format and see it 
              rendered in real-time with proper styling, form handling, and interactive elements.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* JSON Editor Panel */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-primary" />
                Configuration Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <JsonEditor
                value={jsonValue}
                onChange={handleJsonChange}
                onParse={handleJsonParse}
                error={error}
              />
            </CardContent>
          </Card>

          {/* Rendered UI Panel */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {parsedConfig ? (
                <div className="bg-background border border-border rounded-lg p-6 min-h-[400px]">
                  <UIRenderer config={parsedConfig} onAction={handleAction} />
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[400px] bg-muted/20 border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center">
                    <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No Configuration Loaded
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Enter valid JSON configuration to see the rendered UI
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const jsonEditor = document.querySelector('textarea');
                        if (jsonEditor) {
                          const loadExample = jsonEditor.parentElement?.parentElement?.querySelector('button[title="Load Example"]') as HTMLButtonElement;
                          loadExample?.click();
                        }
                      }}
                    >
                      Load Example Configuration
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Supported Components */}
        <Card className="mt-8 shadow-medium">
          <CardHeader>
            <CardTitle>Supported Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Heading', type: 'heading', desc: 'H1-H6 elements' },
                { name: 'Text', type: 'text', desc: 'Paragraph content' },
                { name: 'Input', type: 'input', desc: 'Form inputs' },
                { name: 'Button', type: 'button', desc: 'Interactive buttons' },
                { name: 'Section', type: 'section', desc: 'Grouped content' },
                { name: 'Form', type: 'form', desc: 'Form containers' },
                { name: 'Divider', type: 'divider', desc: 'Visual separators' },
                { name: 'Spacer', type: 'spacer', desc: 'Layout spacing' },
              ].map((component) => (
                <div key={component.type} className="p-3 bg-muted/30 rounded-md">
                  <div className="font-medium text-foreground">{component.name}</div>
                  <div className="text-sm text-muted-foreground">{component.desc}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {component.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
