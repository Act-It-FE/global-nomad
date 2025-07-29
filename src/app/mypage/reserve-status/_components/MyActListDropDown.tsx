'use client';

import { useState } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import Icon from '@/components/Icon';

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

  return (
    <div className='relative leading-[normal]'>
      <button
        className='flex h-54 w-full items-center justify-between self-stretch rounded-2xl border border-gray-100 bg-white px-20 py-16 text-gray-950 shadow-[0_2px_6px_0_rgba(0,0,0,0.02)]'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='txt-16_M max-w-500 truncate tracking-[-0.4px]'>
          {selectedActivity?.title || '체험 목록'}
        </span>
        <Icon icon={isOpen ? 'TriangleUp' : 'TriangleDown'} />
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 left-0 z-10 mt-1 max-h-400 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg'>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className='cursor-pointer border-gray-50 px-20 py-16 hover:bg-gray-50 [&:not(:first-child)]:border-t'
              onClick={() => {
                onActivitySelect(activity);
                setIsOpen(false);
              }}
            >
              {activity.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
