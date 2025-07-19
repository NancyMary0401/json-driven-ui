import React from 'react';
import { SectionElement, UIElement } from '@/types/ui-config';
import { cn } from '@/lib/utils';

interface SectionRendererProps {
  element: SectionElement;
  renderElement: (element: UIElement, index: number) => React.ReactNode;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ element, renderElement }) => {
  return (
    <section 
      className={cn(
        "bg-card border border-border rounded-lg p-6 shadow-soft",
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
      <div className="space-y-4">
        {element.children.map((child, index) => renderElement(child, index))}
      </div>
    </section>
  );
};