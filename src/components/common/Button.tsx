import { ReactNode } from 'react';

import {
  BUTTON_ROUNDED,
  BUTTON_SIZE,
  BUTTON_VARIANTS,
  buttonRoundedPixel,
  buttonVariants,
} from '@/constants/ButtonStyles';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  size?: keyof typeof BUTTON_SIZE;
  variant?: buttonVariants;
  rounded?: buttonRoundedPixel;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  rounded = '12',
  size,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon,
}: ButtonProps) {
  const sizeStyle = size ? BUTTON_SIZE[size] : ''; //사이즈 Prop 을 사용하지 않으면 className 으로 스타일 지정 가능
  return (
    <button
      className={`${BUTTON_VARIANTS[variant]} ${BUTTON_ROUNDED[rounded]} ${sizeStyle} transition ${className} `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </button>
  );
}
