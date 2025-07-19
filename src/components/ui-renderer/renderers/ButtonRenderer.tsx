import React from 'react';
import { ButtonElement } from '@/types/ui-config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonRendererProps {
  element: ButtonElement;
  onAction?: (action: string, data?: any) => void;
}

export const ButtonRenderer: React.FC<ButtonRendererProps> = ({ element, onAction }) => {
  const handleClick = () => {
    if (element.action && onAction) {
      onAction(element.action, element);
    }
  };

  return (
    <Button
      variant={element.variant || 'default'}
      size={element.size || 'default'}
      disabled={element.disabled}
      onClick={handleClick}
      className={cn("transition-smooth", element.className)}
      style={element.style}
      id={element.id}
    >
      {element.text}
    </Button>
  );
};