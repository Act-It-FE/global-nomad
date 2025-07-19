'use client';

import { cn } from '@/utils/cn';

type DropDownProps = {
  firstText: string;
  secondText: string;
  onClickFirst: () => void;
  onClickSecond: () => void;
};

export default function DropDown({
  firstText,
  secondText,
  onClickFirst,
  onClickSecond,
}: DropDownProps) {
  const buttonClass = cn(
    'cursor-pointer py-[18px] hover:bg-primary-100 w-full max-h-55 txt-16_M',
  );

  const textClass = (text: string) => {
    return cn('text-gray-950', text === '로그아웃' && 'text-red-500');
  };
  return (
    <div className='flex w-95 flex-col justify-center rounded-[8px] border border-gray-50 bg-white text-gray-950 md:h-106 md:w-103 lg:h-auto lg:w-95'>
      <button className={buttonClass} onClick={onClickFirst}>
        <span>{firstText}</span>
      </button>
      <button className={buttonClass} onClick={onClickSecond}>
        <span className={textClass(secondText)}>{secondText}</span>
      </button>
    </div>
  );
}
