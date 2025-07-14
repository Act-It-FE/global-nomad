import { BUTTON_VARIANTS, BUTTON_ROUNDED } from '@/constants/ButtonStyles';
import { ButtonProps } from '@/types/Button';

export default function Button({
  children,
  variant = 'primary',
  rounded = '12',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${BUTTON_VARIANTS[variant]} ${BUTTON_ROUNDED[rounded]} transition ${className} `}
    >
      {children}
    </button>
  );
}
