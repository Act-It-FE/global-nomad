'use client';

import Icon from '@/components/Icon';
import { cn } from '@/utils/cn';

type CategoryProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const categories = [
  { label: '문화 · 예술', icon: 'Art' },
  { label: '식음료', icon: 'Food' },
  { label: '스포츠', icon: 'Sport' },
  { label: '투어', icon: 'Tour' },
  { label: '관광', icon: 'Bus' },
  { label: '웰빙', icon: 'Wellbeing' },
] as const;

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryProps) {
  return (
    <div className='overflow-x-auto p-1'>
      <div className='flex gap-8 md:gap-20'>
        {categories.map(({ label, icon }) => {
          const isSelected = selectedCategory === label;
          return (
            <button
              key={label}
              className={cn(
                'flex shrink-0 items-center justify-center gap-4 rounded-[100px] px-14 py-10 md:gap-6 md:px-16',
                isSelected ? 'bg-[#333333]' : 'bg-white ring-1 ring-[#D8D8D8]',
              )}
              onClick={() => onSelectCategory(isSelected ? null : label)}
            >
              <Icon
                className={cn(
                  'size-16 md:size-24',
                  isSelected ? 'text-white' : 'text-black',
                )}
                icon={icon}
              />
              <span
                className={cn(
                  'txt-14_M md:txt-16_M leading-17 md:leading-19',
                  isSelected ? 'text-white' : 'text-gray-950',
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
