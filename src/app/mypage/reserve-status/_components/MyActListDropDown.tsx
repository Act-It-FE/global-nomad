'use client';

import { useRef } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import Input from '@/components/Input';

export function MyActListDropDown({
  activities,
}: {
  selectedActivity: ActivityBasic | null;
  onActivitySelect: (activity: ActivityBasic) => void;
  activities: ActivityBasic[];
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={dropdownRef} className='relative leading-[normal]'>
      <Input
        id='activity-dropdown'
        items={activities.map((activity) => activity.title)}
        placeholder='체험 선택'
        type='dropdown'
      />
    </div>
  );
}
