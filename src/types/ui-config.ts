export interface UIElement {
  type: string;
  id?: string;
  className?: string;
  style?: Record<string, any>;
  [key: string]: any;
}

export interface HeadingElement extends UIElement {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface InputElement extends UIElement {
  type: 'input';
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export interface ButtonElement extends UIElement {
  type: 'button';
  text: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  action?: string;
  disabled?: boolean;
}

export interface TextElement extends UIElement {
  type: 'text';
  content: string;
  variant?: 'body' | 'small' | 'large' | 'muted';
}

export interface SectionElement extends UIElement {
  type: 'section';
  title?: string;
  children: UIElement[];
}

export interface FormElement extends UIElement {
  type: 'form';
  title?: string;
  action?: string;
  method?: 'GET' | 'POST';
  children: UIElement[];
}

export interface DividerElement extends UIElement {
  type: 'divider';
}

export interface SpacerElement extends UIElement {
  type: 'spacer';
  size?: 'sm' | 'md' | 'lg';
}

export interface PageConfig {
  type: 'page';
  title?: string;
  description?: string;
  elements: UIElement[];
}

export type ComponentType = 
  | HeadingElement 
  | InputElement 
  | ButtonElement 
  | TextElement 
  | SectionElement 
  | FormElement 
  | DividerElement 
  | SpacerElement;