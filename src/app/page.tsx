'use client';

import { useUserStore } from '@/stores/userStore';

import AllActivities from './_components/AllActivities';

export default function Home() {
  const user = useUserStore((s) => s.user);
  return (
    <div className='mx-auto max-w-1200'>
      <h1> {user?.nickname}님</h1>
      <div className='mx-24 min-h-800 md:mx-30 lg:mx-40'>
        <AllActivities />
      </div>
    </div>
  );
}
