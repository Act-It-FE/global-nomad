'use client';

import { ReactNode, useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

type DropDownItem = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean; // 로그아웃 버튼에 텍스트컬러 적용을 위한 Prop
};

type DropDownProps = {
  trigger: ReactNode;
  items: DropDownItem[]; // 드롭다운에 들어갈 텍스트들 ex) 수정하기, 삭제하기 등등
  position?: 'bottom' | 'left';
};

export default function DropDown({
  trigger,
  items,
  position = 'bottom',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className='relative'>
      <div
        className='cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 flex flex-col',
            position === 'left'
              ? 'top-1/2 right-full mr-2 -translate-y-1/5'
              : 'top-full left-1/2 mt-2 -translate-x-1/2',
          )}
        >
          {items.map(({ text, onClick, danger }, idx) => (
            <button
              key={idx}
              className={cn(
                'txt-16_M px-19 py-18 leading-19 whitespace-nowrap',
                'hover:bg-primary-100 bg-white',
                'first:rounded-t-lg last:rounded-b-lg',
                'border-x border-gray-50 first:border-t last:border-b',
                danger ? 'text-red-500' : 'text-gray-950',
              )}
              onClick={(e) => {
                onClick(e);
                setIsOpen(false);
              }}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
