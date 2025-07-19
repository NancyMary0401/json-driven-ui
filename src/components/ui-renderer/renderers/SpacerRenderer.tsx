import React from 'react';
import { SpacerElement } from '@/types/ui-config';
import { cn } from '@/lib/utils';

interface SpacerRendererProps {
  element: SpacerElement;
}

export const SpacerRenderer: React.FC<SpacerRendererProps> = ({ element }) => {
  const sizeClasses = {
    sm: "h-4",
    md: "h-8",
    lg: "h-16"
  };

  return (
    <div 
      className={cn(
        sizeClasses[element.size || 'md'],
        element.className
      )}
      style={element.style}
      id={element.id}
    />
  );
};