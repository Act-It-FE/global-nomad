'use client';

import { useMyActQuery } from '@/hooks/myActivities/useMyActivitiesQuery';

import { Calendar } from './_components/calendar/Calendar';
import { MyActListDropDown } from './_components/MyActListDropDown';

export default function Page() {
  const { data } = useMyActQuery();

  if (!data) return null;
  return (
    <div className='flex w-full flex-col'>
      <MyActListDropDown activities={data.activities} />
      <Calendar />
    </div>
  );
}
