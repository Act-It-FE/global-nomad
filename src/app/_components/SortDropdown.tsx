'use client';

import { useRef, useState } from 'react';

import { Sort } from '@/api/types/activities';
import Icon from '@/components/Icon';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

type Props = {
  selected: string;
  onChange: (value: Sort) => void;
};

const sortOptions = [
  { label: '최신순', value: 'latest' },
  { label: '리뷰 많은순', value: 'most_reviewed' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
] as const;

export default function SortDropdown({ selected = 'latest', onChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  const selectedLabel = sortOptions.find(
    (option) => option.value === selected,
  )?.label;

  return (
    <div ref={dropdownRef} className='relative inline-block'>
      <button
        className='flex items-center rounded-[15px] py-10 pr-10 pl-14'
        type='button'
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className='txt-16_M leading-19 text-gray-950'>
          {selectedLabel}
        </span>
        <Icon className='size-20' icon='TriangleDown' />
      </button>

      {open && (
        <ul className='absolute right-10 z-11 mt-2 min-w-[150px] rounded border border-gray-200 bg-white shadow'>
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  'w-full px-16 py-11 text-right hover:bg-gray-100',
                  selected === option.value
                    ? 'txt-14_B text-black'
                    : 'txt-14_M text-gray-950',
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
