'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import AllActivities from './_components/AllActivities';
import PopularActivities from './_components/PopularActivities';
import Search from './_components/Search';
import SearchResult from './_components/SearchResult';

export default function Home() {
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
      <div className='mx-24 flex min-h-800 flex-col gap-40 pb-136 md:mx-30 md:gap-80 md:pb-204 lg:mx-40 lg:pb-218'>
        <Search isLoading={isLoading} onSearch={handleSearch} />
        {keyword ? (
          <SearchResult keyword={keyword} onLoadingChange={setIsLoading} />
        ) : (
          <>
            <PopularActivities />
            <AllActivities />
          </>
        )}
      </div>
    </div>
  );
}
