// src/app/mypage/reserve-status/page.tsx

'use client';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';

import { MyActListDropDown } from './_components/MyActListDropDown';

export default function Page() {
  const { data } = useMyActQuery();

  if (!data) return null;
  return (
    <div className='flex w-full flex-col'>
      <MyActListDropDown activities={data.activities} />
    </div>
  );
}
