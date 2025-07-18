export type buttonRoundedPixel = '16' | '14' | '12' | '8';

export type buttonVariants = 'primary' | 'secondary' | 'kakao';

export type buttonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/* 버튼 배경색, 텍스트색상, 테두리 색상
  primary: 대표색 : 하늘색 배경, 텍스트 흰색
  secondary : 흰색 배경, 회색 테두리, 텍스트 검정색
  kakaoButton : 카카오 로그인/회원가입에 사용하는 버튼을 보여줍니다. */
export const BUTTON_VARIANTS: Record<buttonVariants, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-100 cursor-pointer',
  secondary:
    'bg-white text-gray-600 border border-gray-200 hover:bg-gray-200 cursor-pointer',
  kakao:
    'flex flex-row gap-2 items-center justify-center bg-white text-gray-600 border border-gray-200 cursor-pointer hover:bg-[rgb(250,227,0)]',
} as const;

/* 버튼 테두리 rounded 값

rounded='14' 이런식으로 작성하시면 됩니다.
*/
export const BUTTON_ROUNDED: Record<buttonRoundedPixel, string> = {
  '16': 'rounded-[16px]',
  '14': 'rounded-[14px]',
  '12': 'rounded-[12px]',
  '8': 'rounded-[8px]',
} as const;

/* 버튼 사이즈와 텍스트 */
export const BUTTON_SIZE: Record<buttonSize, string> = {
  xs: 'w-full max-w-68 h-29',
  sm: 'w-full max-w-120 h-41',
  md: 'w-full max-w-135 h-47',
  lg: 'w-full max-w-200 h-47',
  xl: 'w-full max-w-640 h-54',
} as const;
