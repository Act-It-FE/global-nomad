'use client';

import {
  InputHTMLAttributes,
  MouseEvent,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import Icon from './Icon';

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
  height?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type DropdownProps = CommonProps & {
  type: 'dropdown';
  items: string[];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

const COMMON_STYLE =
  'text-16_M h-54 w-full rounded-2xl border border-gray-100 px-19 py-15 leading-19 outline-none placeholder:text-gray-400';

const FOCUS_STYLE =
  'focus:border-primary-500 focus:border-[1.5px] focus:px-18.5 focus:py-14.5';

export default function Input({
  id,
  className = '',
  label,
  errorMessage,
  ...props
}: InputProps | TextareaProps | DropdownProps) {
  const insideInput = () => {
    const className = `text-gray-950 ${COMMON_STYLE} ${FOCUS_STYLE} ${errorMessage ? 'border-red-500' : ''}`;

    switch (props.type) {
      case 'dropdown':
        return (
          <DropdownInput className={`${COMMON_STYLE}`} id={id} {...props} />
        );
      case 'textarea':
        return (
          <textarea
            className={`${className} resize-none`}
            id={id}
            style={{ height: props.height }}
            {...props}
          />
        );
      case 'password':
        return <PasswordInput className={className} id={id} {...props} />;
      default:
        return <input className={className} id={id} {...props} />;
    }
  };

  return (
    <div className={'flex flex-col gap-10 ' + className}>
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

function DropdownInput({
  className,
  type,
  onClick,
  defaultValue,
  placeholder,
  items,
  ...props
}: DropdownProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (onClick) onClick(e);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <input
        className={`${className} ${value ? 'text-gray-950' : 'text-gray-400'} text-start`}
        type='button'
        value={value ?? placeholder ?? ''}
        onClick={handleClick}
        {...props}
      />
      <Icon icon='TriangleDown' />
      {isOpen && (
        <div>
          {items.map((item) => (
            <button key={item} onClick={() => setValue(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function PasswordInput({
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <>
      <input type={isPassword ? 'password' : 'text'} {...props} />
      <button
        className='absolute top-15 right-20'
        onClick={() => setIsPassword((prev) => !prev)}
      >
        <Icon
          className='size-24 text-gray-400'
          icon={isPassword ? 'EyeOff' : 'EyeOn'}
        />
      </button>
    </>
  );
}
