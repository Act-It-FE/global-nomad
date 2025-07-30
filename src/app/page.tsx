'use client';

import AllActivities from './_components/AllActivities';
import PopularActivities from './_components/PopularActivities';

export default function Home() {
  return (
    <div className='mx-auto max-w-1200'>
      <div className='mx-24 flex min-h-800 flex-col gap-40 pb-136 md:mx-30 md:gap-80 md:pb-204 lg:mx-40 lg:pb-218'>
        <PopularActivities />
        <AllActivities />
      </div>
    </div>
  );
}
