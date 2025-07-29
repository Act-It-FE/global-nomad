'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Category, Sort } from '@/api/types/activities';
import useActivitiesQuery from '@/hooks/activities/useActivitiesQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import ActivityList from './ActivityList';
import CategoryBar from './CategoryBar';
import SortDropdown from './SortDropdown';

export default function AllActivities() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [sortOption, setSortOption] = useState<Sort>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useMediaQuery('mobile');
  const isTablet = useMediaQuery('tablet');

  let pageSize = 8;
  if (isTablet) pageSize = 4;
  if (isMobile) pageSize = 6;

  const {
    data: { activities = [], totalCount = 0 } = {},
    isLoading,
    isError,
  } = useActivitiesQuery({
    method: 'offset',
    category: selectedCategory || undefined,
    sort: sortOption,
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 바뀌면 페이지 초기화
  };

  const handleChangeSort = (sort: Sort) => {
    setSortOption(sort);
    setCurrentPage(1); // 정렬 바뀌면 페이지 초기화
  };

  return (
    <div className='flex flex-col gap-24 md:gap-30'>
      <section className='flex flex-col'>
        <div className='flex items-center justify-between pb-10 md:pb-17 lg:block lg:pb-20'>
          <div className='md:txt-32_B text-[18px]/26 font-bold'>
            🛼 모든 체험
          </div>
          <div className='lg:hidden'>
            <SortDropdown selected={sortOption} onChange={handleChangeSort} />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          <div className='hidden lg:block'>
            <SortDropdown selected={sortOption} onChange={handleChangeSort} />
          </div>
        </div>
      </section>

      {isLoading && (
        <div className='flex items-center justify-center'>
          <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
        </div>
      )}

      {!isLoading && isError && (
        <p className='txt-18_M text-center text-red-500'>
          데이터를 불러오지 못했어요.
        </p>
      )}

      {!isLoading && !isError && totalCount === 0 && (
        <div className='flex flex-col items-center justify-center leading-[normal]'>
          <Image
            alt='체험이 없어요'
            className='p-30'
            height={182}
            src='/images/empty-image.png'
            width={182}
          />
          <div className='txt-18_M mb-30 tracking-[-0.45px] text-gray-600'>
            체험이 존재하지 않아요.
          </div>
        </div>
      )}

      {!isLoading && !isError && totalCount > 0 && (
        <ActivityList
          activities={activities}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
