// src/app/mypage/reserve-status/page.tsx

'use client';

import { useState } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';

import { MyActListDropDown } from './_components/MyActListDropDown';

export default function Page() {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityBasic | null>(null);
  const { data } = useMyActQuery();

  if (!data) return null;
  return (
    <div className='flex w-full flex-col'>
      <MyActListDropDown
        activities={data.activities}
        selectedActivity={selectedActivity}
        onActivitySelect={setSelectedActivity}
      />
    </div>
  );
}
