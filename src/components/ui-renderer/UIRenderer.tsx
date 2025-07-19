import React from 'react';
import { PageConfig, UIElement } from '@/types/ui-config';
import { HeadingRenderer } from './renderers/HeadingRenderer';
import { InputRenderer } from './renderers/InputRenderer';
import { ButtonRenderer } from './renderers/ButtonRenderer';
import { TextRenderer } from './renderers/TextRenderer';
import { SectionRenderer } from './renderers/SectionRenderer';
import { FormRenderer } from './renderers/FormRenderer';
import { DividerRenderer } from './renderers/DividerRenderer';
import { SpacerRenderer } from './renderers/SpacerRenderer';

interface UIRendererProps {
  config: PageConfig;
  onAction?: (action: string, data?: any) => void;
}

export const UIRenderer: React.FC<UIRendererProps> = ({ config, onAction }) => {
  const renderElement = (element: UIElement, index: number): React.ReactNode => {
    const key = element.id || `${element.type}-${index}`;
    
    switch (element.type) {
      case 'heading':
        return <HeadingRenderer key={key} element={element as any} />;
      case 'input':
        return <InputRenderer key={key} element={element as any} />;
      case 'button':
        return <ButtonRenderer key={key} element={element as any} onAction={onAction} />;
      case 'text':
        return <TextRenderer key={key} element={element as any} />;
      case 'section':
        return <SectionRenderer key={key} element={element as any} renderElement={renderElement} />;
      case 'form':
        return <FormRenderer key={key} element={element as any} renderElement={renderElement} onAction={onAction} />;
      case 'divider':
        return <DividerRenderer key={key} element={element as any} />;
      case 'spacer':
        return <SpacerRenderer key={key} element={element as any} />;
      default:
        console.warn(`Unknown element type: ${element.type}`);
        return null;
    }
  };

  return (
    <div className="ui-renderer space-y-4">
      {config.title && (
        <div className="border-b border-border pb-4 mb-6">
          <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
          {config.description && (
            <p className="text-muted-foreground mt-2">{config.description}</p>
          )}
        </div>
      )}
      {config.elements.map((element, index) => renderElement(element, index))}
    </div>
  );
};