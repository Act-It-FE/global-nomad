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

export default function Input({
  id,
  className = '',
  label,
  errorMessage,
  ...props
}: InputProps | TextareaProps | DropdownProps) {
  const insideInput = () => {
    switch (props.type) {
      case 'dropdown':
        return;
      case 'textarea':
        return <textarea id={id} {...props} />;
      case 'password':
        return;
      default:
        return <input id={id} {...props} />;
    }
  };

  return (
    <div className={'flex flex-col gap-10' + className}>
      {label && (
        <label className='text-16_M leading-19 text-gray-950' htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative flex flex-col gap-6'>
        {insideInput()}
        {errorMessage && (
          <div className='text-12_M mx-8 leading-14 text-red-500'>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
