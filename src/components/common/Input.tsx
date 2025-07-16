import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface CommonProps {
  id: string;
  label?: string;
  errorMessage?: string;
}

type InputProps = CommonProps & {
  type?: InputType;
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = CommonProps & {
  type: 'textarea';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type DropdownProps = CommonProps & {
  type: 'dropdown';
  items: string[];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export default function Input({}: InputProps | TextareaProps | DropdownProps) {
  return;
}
