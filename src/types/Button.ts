import { BUTTON_SIZE, buttonRoundedPixel } from '@/constants/ButtonStyles';
import { buttonVariants } from '@/constants/ButtonStyles';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof BUTTON_SIZE;
  variant?: buttonVariants;
  rounded?: buttonRoundedPixel;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}
