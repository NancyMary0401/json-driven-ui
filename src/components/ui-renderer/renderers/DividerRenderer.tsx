import React from 'react';
import { DividerElement } from '@/types/ui-config';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface DividerRendererProps {
  element: DividerElement;
}

export const DividerRenderer: React.FC<DividerRendererProps> = ({ element }) => {
  return (
    <Separator 
      className={cn("my-4", element.className)}
      style={element.style}
      id={element.id}
    />
  );
};