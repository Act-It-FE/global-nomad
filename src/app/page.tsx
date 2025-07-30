import { Suspense } from 'react';

import MainPage from './_components/MainPage';

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className='flex h-200 items-center justify-center'>
          <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
        </div>
      }
    >
      <MainPage />
    </Suspense>
  );
}
