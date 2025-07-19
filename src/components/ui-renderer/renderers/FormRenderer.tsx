import React from 'react';
import { FormElement, UIElement } from '@/types/ui-config';
import { cn } from '@/lib/utils';

interface FormRendererProps {
  element: FormElement;
  renderElement: (element: UIElement, index: number) => React.ReactNode;
  onAction?: (action: string, data?: any) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ element, renderElement, onAction }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (element.action && onAction) {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      onAction(element.action, data);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      method={element.method || 'POST'}
      className={cn(
        "bg-card border border-border rounded-lg p-6 shadow-soft space-y-4",
        element.className
      )}
      style={element.style}
      id={element.id}
    >
      {element.title && (
        <h3 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {element.title}
        </h3>
      )}
      {element.children.map((child, index) => renderElement(child, index))}
    </form>
  );
};