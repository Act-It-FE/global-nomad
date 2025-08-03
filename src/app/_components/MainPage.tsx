'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import AllActivities from './AllActivities';
import PopularActivities from './PopularActivities';
import Search from './Search';
import SearchResult from './SearchResult';
import TopBanner from './TopBanner';

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get('search') || '';

  const handleSearch = (query: string) => {
    if (query.trim() === '') return;
    const encoded = encodeURIComponent(query);
    router.push(`/?search=${encoded}`);
  };

  return (
    <div className='mx-auto max-w-1200'>
      <div className='mx-24 flex min-h-800 flex-col gap-40 pt-74 pb-136 md:mx-30 md:gap-60 md:pt-103 md:pb-204 lg:mx-40 lg:pb-218'>
        <div className='flex flex-col gap-17 md:gap-30 lg:gap-50'>
          <TopBanner
            imageUrl='https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-7_2150_1753877551618.jpeg'
            subtitle='🧳지금 떠나고 싶은 체험을 예약하세요'
            title='🏝️어디서든, 어떤 계절이든'
          />
          <Search isLoading={isLoading} onSearch={handleSearch} />
        </div>
        {keyword ? (
          <SearchResult keyword={keyword} onLoadingChange={setIsLoading} />
        ) : (
          <>
            <div className='md:pb-20'>
              <PopularActivities />
            </div>
            <AllActivities />
          </>
        )}
      </div>
    </div>
  );
}
