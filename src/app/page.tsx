'use client';
import { Suspense } from 'react';

import { useUserStore } from '@/stores/userStore';

import CloudBackground from './_components/CloudBackground';
import MainPage from './_components/MainPage';
export default function HomePage() {
  const user = useUserStore((s) => s.user);
  return (
    <Suspense
      fallback={
        <div className='flex h-200 items-center justify-center'>
          <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
        </div>
      }
    >
      <CloudBackground>
        <h1> {user?.nickname}님</h1>
        <MainPage />
      </CloudBackground>
    </Suspense>
  );
}
