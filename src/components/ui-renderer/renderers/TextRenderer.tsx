import React from 'react';
import { TextElement } from '@/types/ui-config';
import { cn } from '@/lib/utils';

interface TextRendererProps {
  element: TextElement;
}

export const TextRenderer: React.FC<TextRendererProps> = ({ element }) => {
  const variantClasses = {
    body: "text-base text-foreground",
    small: "text-sm text-muted-foreground",
    large: "text-lg text-foreground",
    muted: "text-sm text-muted-foreground"
  };

  return (
    <p 
      className={cn(
        variantClasses[element.variant || 'body'],
        "leading-relaxed",
        element.className
      )}
      style={element.style}
      id={element.id}
    >
      {element.content}
    </p>
  );
};