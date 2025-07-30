'use client';

import AllActivities from './_components/AllActivities';

export default function Home() {
  return (
    <div className='mx-auto max-w-1200'>
      <div className='mx-24 min-h-800 md:mx-30 lg:mx-40'>
        <AllActivities />
      </div>
    </div>
  );
}
