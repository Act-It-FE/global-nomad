'use client';

import { ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';

type DropDownProps = {
  trigger: ReactNode; // 이미지 컴포넌트 사용 가능
  firstText: string;
  secondText: string;
  onClickFirst: () => void;
  onClickSecond: () => void;
  position?: 'bottom' | 'left'; //기본값은 bottom 입니다
};

export default function DropDown({
  trigger,
  firstText,
  secondText,
  onClickFirst,
  onClickSecond,
  position = 'bottom',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonClass = cn(
    'cursor-pointer py-[18px] hover:bg-primary-100 w-full max-h-55 txt-16_M',
  );

  const textClass = (text: string) => {
    return cn('text-gray-950', text === '로그아웃' && 'text-red-500');
  };

  const dropdownPosition = cn(
    'absolute z-50',
    position === 'left'
      ? 'right-full mr-2 top-1/2 -translate-y-1/5'
      : 'top-full mt-2 left-1/2 -translate-x-1/2',
  );
  return (
    <div className='relative'>
      <div
        className='cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            dropdownPosition,
            'flex w-95 flex-col justify-center rounded-[8px] border border-gray-50 bg-white text-gray-950 md:h-106 md:w-103 lg:h-auto lg:w-95',
          )}
        >
          <button className={buttonClass} onClick={onClickFirst}>
            <span>{firstText}</span>
          </button>
          <button className={buttonClass} onClick={onClickSecond}>
            <span className={textClass(secondText)}>{secondText}</span>
          </button>
        </div>
      )}
    </div>
  );
}
