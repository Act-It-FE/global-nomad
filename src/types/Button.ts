import { ButtonRoundedPixel } from '@/constants/ButtonStyles';
import { ButtonVariants } from '@/constants/ButtonStyles';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariants;
  rounded?: ButtonRoundedPixel;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}
