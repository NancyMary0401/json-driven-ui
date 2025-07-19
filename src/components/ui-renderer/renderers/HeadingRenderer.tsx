import React from 'react';
import { HeadingElement } from '@/types/ui-config';
import { cn } from '@/lib/utils';

interface HeadingRendererProps {
  element: HeadingElement;
}

export const HeadingRenderer: React.FC<HeadingRendererProps> = ({ element }) => {
  const baseClasses = "font-semibold text-foreground";
  
  const headingClasses = {
    1: "text-4xl mb-6",
    2: "text-3xl mb-5",
    3: "text-2xl mb-4",
    4: "text-xl mb-3",
    5: "text-lg mb-2",
    6: "text-base mb-2"
  };

  const HeadingTag = `h${element.level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag 
      className={cn(
        baseClasses, 
        headingClasses[element.level],
        element.className
      )}
      style={element.style}
      id={element.id}
    >
      {element.text}
    </HeadingTag>
  );
};