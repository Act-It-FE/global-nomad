'use client';

import {
  ChangeEvent,
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
  maxHeight?: string;
  onDropdownSelect?: (index: number) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

type DateCustomProps = CommonProps & {
  type: 'date-custom';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;

const COMMON_STYLE = cn(
  'h-54 w-full rounded-2xl bg-white border border-gray-100 px-19 py-15 outline-none',
  'txt-16_M leading-19 placeholder:text-gray-400',
);

const FOCUS_STYLE = cn(
  'focus:border-primary-500 focus:border-[1.5px]',
  'focus:px-18.5 focus:py-14.5',
);

const SCROLLBAR_STYLE = cn(
  '[&::-webkit-scrollbar]:w-3',
  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200',
  '[&::-webkit-scrollbar-button]:hidden',
);

export default function Input({
  className = '',
  label,
  errorMessage,
  ...props
}: InputProps | TextareaProps | DropdownProps | DateCustomProps) {
  const insideInput = () => {
    const className = cn(
      'text-gray-950',
      COMMON_STYLE,
      FOCUS_STYLE,
      errorMessage ? 'border-red-500' : '',
    );

    switch (props.type) {
      case 'dropdown':
        return (
          <DropdownInput
            className={`${COMMON_STYLE} ${FOCUS_STYLE}`}
            {...props}
          />
        );
      case 'textarea':
        return <TextareaInput className={className} {...props} />;
      case 'password':
        return <PasswordInput className={className} {...props} />;
      case 'date-custom':
        return <DateCustomInput className={className} {...props} />;
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
  maxHeight = '280px',
  onDropdownSelect,
  ...props
}: DropdownProps) {
  const [value, setValue] = useState({ item: defaultValue, key: '' });
  const [isOpen, setIsOpen] = useState(false);
  const elements = useRef(
    items.map((item) => ({ item, key: crypto.randomUUID() })),
  );
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (onClick) onClick(e);
    setIsOpen((prev) => !prev);
  };

  const handleIconClick = () => {
    ref.current?.focus();
    ref.current?.click();
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <>
      <input
        ref={ref}
        className={cn(
          className,
          value.item ? 'text-gray-950' : 'text-gray-400',
          'truncate pr-43 text-start focus:pr-42.5',
        )}
        type='button'
        value={value.item ?? placeholder ?? ''}
        onClick={handleClick}
        {...props}
      />
      <div className='absolute top-15 right-20' onClick={handleIconClick}>
        <Icon className='size-24 text-gray-950' icon='TriangleDown' />
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute top-64 z-10 w-full rounded-2xl border border-gray-100 bg-white px-8 py-11',
            'shadow-[0_2px_6px_rgba(0,0,0,0.02)]',
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-4 overflow-y-auto pl-3',
              SCROLLBAR_STYLE,
            )}
            style={{
              maxHeight: `calc(${maxHeight} - 24px)`,
              scrollbarGutter: 'stable',
            }}
          >
            {elements.current.map((element, index) => (
              <button
                key={element.key}
                className={cn(
                  'txt-16_M rounded-xl px-20 py-16 text-start leading-none wrap-break-word text-gray-900',
                  element.key === value.key && 'bg-primary-100',
                )}
                type='button'
                onClick={() => {
                  setValue(element);
                  setIsOpen(false);
                  onDropdownSelect?.(index);
                }}
              >
                {element.item}
              </button>
            ))}
          </div>
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
          'block h-full resize-none pl-3 outline-none',
          SCROLLBAR_STYLE,
        )}
        style={{ scrollbarGutter: 'stable' }}
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

function DateCustomInput({ type, ...props }: DateCustomProps) {
  const textRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^\d/]/g, '');
    if (e.target.value && e.target.validity.valid && dateRef.current)
      dateRef.current.value = '20' + e.target.value.replaceAll('/', '-');
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (textRef.current)
      textRef.current.value = e.target.value.replaceAll('-', '/').slice(2);
  };

  return (
    <div className='relative'>
      <input
        ref={textRef}
        maxLength={8}
        pattern='\d{2}/(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])'
        placeholder='yy/mm/dd'
        onChange={handleChange}
        {...props}
      />
      <div className='absolute top-15 right-20 bottom-15 w-24'>
        <div className='relative size-full'>
          <Icon className='size-24 text-black' icon='Calender' />
          <input
            ref={dateRef}
            className='absolute inset-0 opacity-0'
            max='2099-12-31'
            min='2000-01-01'
            type='date'
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
}
