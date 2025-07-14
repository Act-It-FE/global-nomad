export type ButtonRoundedPixel = '16' | '14' | '12' | '8';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'disable'
  | 'editButton'
  | 'deleteButton';

/* 버튼 배경색, 텍스트색상, 테두리 색상
  primary: 대표색 : 하늘색 배경, 텍스트 흰색
  secondary : 흰색 배경, 회색 테두리, 텍스트 검정색
  disable: 배경 진한 회색, 텍스트 연한 회색
  editButton : 가장 작은 사이즈의 수정하기, 예약변경 버튼 (혹시 몰라서 추가했습니다.)
  deleteButton : 가장 작은 사이즈의 삭제하기, 예약취소 버튼 (혹시 몰라서 추가했습니다.) */
export const BUTTON_VARIANTS: Record<ButtonVariants, string> = {
  primary:
    'bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-100)] cursor-pointer',
  secondary:
    'bg-white text-[var(--color-gray-600)] border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-200)] cursor-pointer',
  disable:
    'bg-[var(--color-gray-200)] text-[var(--color-gray-50)] cursor-pointer',
  editButton:
    'bg-white text-[var(--color-gray-600)] border border-[var(--color-gray-50)] cursor-pointer  hover:bg-[var(--color-gray-200)]',
  deleteButton:
    'bg-[var(--color-gray-50)] text-[var(--color-gray-600)] cursor-pointer  hover:bg-[var(--color-gray-200)]',
} as const;

/* 버튼 테두리 rounded 값

rounded='14' 이런식으로 작성하시면 됩니다.
*/
export const BUTTON_ROUNDED: Record<ButtonRoundedPixel, string> = {
  '16': 'rounded-[16px]',
  '14': 'rounded-[14px]',
  '12': 'rounded-[12px]',
  '8': 'rounded-[8px]',
} as const;
