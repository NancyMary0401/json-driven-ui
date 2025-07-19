import React from 'react';
import { InputElement } from '@/types/ui-config';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputRendererProps {
  element: InputElement;
}

export const InputRenderer: React.FC<InputRendererProps> = ({ element }) => {
  return (
    <div className={cn("space-y-2", element.className)} style={element.style} id={element.id}>
      {element.label && (
        <Label htmlFor={element.name} className="text-sm font-medium text-foreground">
          {element.label}
          {element.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Input
        type={element.inputType || 'text'}
        name={element.name}
        id={element.name}
        placeholder={element.placeholder}
        required={element.required}
        defaultValue={element.value}
        className="transition-smooth"
      />
    </div>
  );
};