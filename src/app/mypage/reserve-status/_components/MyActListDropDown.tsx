'use client';

import { useRef } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import Input from '@/components/Input';
import { useCalendarStore } from '@/stores/calendarStore';

export function MyActListDropDown({
  activities,
}: {
  activities: ActivityBasic[];
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSelectedActivityId } = useCalendarStore();

  return (
    <div ref={dropdownRef} className='relative leading-[normal]'>
      <Input
        id='activity-dropdown'
        items={activities.map((activity) => activity.title)}
        placeholder='체험 선택'
        type='dropdown'
        onSelect={(selectedItem) => {
          const selectedActivity = activities.find(
            (activity) => activity.title === selectedItem,
          );
          if (selectedActivity) {
            setSelectedActivityId(selectedActivity.id);
          }
        }}
      />
    </div>
  );
}
