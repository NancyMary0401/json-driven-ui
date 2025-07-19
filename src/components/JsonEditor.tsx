import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Copy, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onParse: (parsed: any) => void;
  error?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, onParse, error }) => {
  const [isValidJson, setIsValidJson] = useState(true);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    
    try {
      const parsed = JSON.parse(newValue);
      setIsValidJson(true);
      onParse(parsed);
    } catch (e) {
      setIsValidJson(false);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch (e) {
      // Ignore formatting errors
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      console.error('Failed to copy to clipboard');
    }
  };

  const loadExample = () => {
    const example = {
      "type": "page",
      "title": "Contact Us",
      "description": "Get in touch with our team",
      "elements": [
        { 
          "type": "heading", 
          "level": 2, 
          "text": "Send us a message" 
        },
        { 
          "type": "text", 
          "content": "We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
          "variant": "muted"
        },
        { 
          "type": "divider" 
        },
        {
          "type": "form",
          "title": "Contact Form",
          "action": "/submit-contact",
          "children": [
            { 
              "type": "input", 
              "label": "Full Name", 
              "name": "name", 
              "placeholder": "Enter your full name",
              "required": true
            },
            { 
              "type": "input", 
              "label": "Email", 
              "name": "email", 
              "inputType": "email",
              "placeholder": "Enter your email address",
              "required": true
            },
            { 
              "type": "input", 
              "label": "Subject", 
              "name": "subject", 
              "placeholder": "What's this about?"
            },
            { 
              "type": "spacer", 
              "size": "sm" 
            },
            { 
              "type": "button", 
              "text": "Send Message", 
              "variant": "default",
              "action": "/submit" 
            }
          ]
        }
      ]
    };
    
    onChange(JSON.stringify(example, null, 2));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">JSON Configuration</h3>
          {isValidJson ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadExample}
            className="transition-smooth"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Load Example
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFormat}
            disabled={!isValidJson}
            className="transition-smooth"
          >
            Format
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="transition-smooth"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter your UI configuration JSON here..."
        className={cn(
          "min-h-[400px] font-mono text-sm bg-editor text-editor-foreground border-border transition-smooth",
          !isValidJson && "border-destructive"
        )}
      />
      
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!isValidJson && !error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>Invalid JSON format. Please check your syntax.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};