'use client';

import { useState } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';

import { MyActListDropDown } from './_components/MyActListDropDown';

export default function Page() {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityBasic | null>(null);
  const { data } = useMyActQuery();
  // const { data: reservationDashboard } = useMyActReservationDashboard(
  //   data?.activities[0].id || 0,
  //   { year: '2025', month: '07' },
  // );

  if (!data) return null;

  return (
    <div className='flex w-full flex-col'>
      <MyActListDropDown
        activities={data.activities}
        selectedActivity={selectedActivity}
        onActivitySelect={setSelectedActivity}
      />
      {/* {data?.activities.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
        </div>
      ))} */}
    </div>
  );
}
