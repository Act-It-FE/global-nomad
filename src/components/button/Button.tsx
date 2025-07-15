import {
  BUTTON_VARIANTS,
  BUTTON_ROUNDED,
  BUTTON_SIZE,
} from '@/constants/ButtonStyles';
import { ButtonProps } from '@/types/Button';

export default function Button({
  children,
  variant = 'primary',
  rounded = '12',
  size,
  className = '',
  onClick,
  type = 'button',
  icon,
}: ButtonProps) {
  const sizeStyle = size ? BUTTON_SIZE[size] : ''; //사이즈 Prop 을 사용하지 않으면 className 으로 스타일 지정 가능
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${BUTTON_VARIANTS[variant]} ${BUTTON_ROUNDED[rounded]} ${sizeStyle} transition ${className} `}
    >
      {icon && icon}
      {children}
    </button>
  );
}
