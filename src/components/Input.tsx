'use client';

import {
  InputHTMLAttributes,
  MouseEvent,
  TextareaHTMLAttributes,
  useRef,
  useState,
} from 'react';

import EyeOff from '@/assets/icons/eye_off.svg';
import EyeOn from '@/assets/icons/eye_on.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

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
  'txt-16_M h-54 w-full rounded-2xl bg-white border border-gray-100 px-19 py-15 leading-19 outline-none placeholder:text-gray-400';

const FOCUS_STYLE =
  'focus:border-primary-500 focus:border-[1.5px] focus:px-18.5 focus:py-14.5';

export default function Input({
  className = '',
  label,
  errorMessage,
  ...props
}: InputProps | TextareaProps | DropdownProps) {
  const insideInput = () => {
    const className = `text-gray-950 ${COMMON_STYLE} ${FOCUS_STYLE} ${errorMessage ? 'border-red-500' : ''}`;

    switch (props.type) {
      case 'dropdown':
        return <DropdownInput className={`${COMMON_STYLE}`} {...props} />;
      case 'textarea':
        return <TextareaInput className={className} {...props} />;
      case 'password':
        return <PasswordInput className={className} {...props} />;
      default:
        return <input className={className} {...props} />;
    }
  };

  return (
    <div className={'flex flex-col gap-10 ' + className}>
      {label && (
        <label className='txt-16_M leading-19 text-gray-950' htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className='relative flex flex-col gap-6'>
        {insideInput()}
        {props.type !== 'dropdown' && errorMessage && (
          <div className='txt-12_M mx-8 leading-14 text-red-500'>
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
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (onClick) onClick(e);
    setIsOpen((prev) => !prev);
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <>
      <input
        ref={ref}
        className={`${className} ${value ? 'text-gray-950' : 'text-gray-400'} text-start`}
        type='button'
        value={value ?? placeholder ?? ''}
        onClick={handleClick}
        {...props}
      />
      <label className='absolute top-15 right-20' htmlFor={props.id}>
        <Icon className='size-24 text-gray-950' icon='TriangleDown' />
      </label>
      {isOpen && (
        <div
          className={cn(
            'z-10 flex flex-col gap-4',
            'absolute top-64 w-full rounded-2xl border border-gray-100 bg-white p-12',
            'shadow-[0_2px_6px_rgba(0,0,0,0.02)]',
          )}
        >
          {items.map((item) => (
            <button
              key={item}
              className={cn(
                'txt-16_M h-48 rounded-xl px-20 text-start text-gray-900',
                item === value && 'bg-primary-100',
              )}
              type='button'
              onClick={() => {
                setValue(item);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function TextareaInput({ className, height, ...props }: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={cn(
        className,
        isFocused
          ? 'border-primary-500 border-[1.5px] px-[15.5px] py-[14.5px]'
          : 'px-[16px]',
      )}
      style={{ height }}
    >
      <textarea
        className={cn(
          'block h-full resize-none outline-none',
          '[&::-webkit-scrollbar]:w-3',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200',
          '[&::-webkit-scrollbar-button]:hidden',
        )}
        style={{
          scrollbarGutter: 'stable both-edges',
        }}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        {...props}
      />
    </label>
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
        type='button'
        onClick={() => setIsPassword((prev) => !prev)}
      >
        {isPassword ? (
          <EyeOff className='size-24 text-gray-400' />
        ) : (
          <EyeOn className='size-24 text-gray-400' />
        )}
      </button>
    </>
  );
}
