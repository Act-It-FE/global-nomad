'use client';

import { useRef, useState } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import Icon from '@/components/Icon';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export function MyActListDropDown({
  selectedActivity,
  onActivitySelect,
  activities,
}: {
  selectedActivity: ActivityBasic | null;
  onActivitySelect: (activity: ActivityBasic) => void;
  activities: ActivityBasic[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    focusedIndex,
    containerRef: listRef,
    handleKeyDown,
    handleOptionKeyDown,
    resetFocus,
    setOptionRef,
  } = useKeyboardNavigation({
    items: activities,
    isOpen,
    onSelect: onActivitySelect,
    onClose: () => {
      setIsOpen(false);
      resetFocus();
      buttonRef.current?.focus();
    },
    onOpen: () => {
      setIsOpen(true);
    },
  });

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    resetFocus();
  });

  return (
    <div ref={dropdownRef} className='relative leading-[normal]'>
      <button
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-label='체험 목록 선택'
        className='flex h-54 w-full items-center justify-between self-stretch rounded-2xl border border-gray-100 bg-white px-20 py-16 text-gray-950 shadow-[0_2px_6px_0_rgba(0,0,0,0.02)]'
        type='button'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onKeyDown={handleKeyDown}
      >
        <span className='txt-16_M max-w-200 truncate tracking-[-0.4px] max-lg:md:max-w-300 lg:max-w-500'>
          {selectedActivity?.title || '체험 목록'}
        </span>
        <Icon icon={isOpen ? 'TriangleUp' : 'TriangleDown'} />
      </button>

      {isOpen && (
        <div
          ref={listRef as React.Ref<HTMLDivElement>}
          aria-label='체험 목록'
          className='absolute top-full right-0 left-0 z-10 mt-1 max-h-400 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg'
          role='listbox'
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              ref={setOptionRef(index)}
              aria-selected={selectedActivity?.id === activity.id}
              className={`cursor-pointer border-gray-50 px-20 py-16 hover:bg-gray-50 focus:bg-blue-50 focus:outline-none [&:not(:first-child)]:border-t ${
                focusedIndex === index ? 'bg-blue-50' : ''
              }`}
              role='option'
              tabIndex={0}
              onClick={() => {
                onActivitySelect(activity);
                setIsOpen(false);
                resetFocus();
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, activity)}
            >
              {activity.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
