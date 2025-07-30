'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import useActivitiesQuery from '@/hooks/activities/useActivitiesQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import ActivityList from './ActivityList';

interface SearchResultProps {
  keyword: string;
  onLoadingChange: (loading: boolean) => void;
}

export default function SearchResult({
  keyword,
  onLoadingChange,
}: SearchResultProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isMinLoadingDone, setIsMinLoadingDone] = useState(false);

  const isMobile = useMediaQuery('mobile');
  const isTablet = useMediaQuery('tablet');

  const {
    data: { activities = [], totalCount = 0 } = {},
    isLoading,
    isError,
  } = useActivitiesQuery({
    method: 'offset',
    keyword: keyword,
    page: currentPage,
    size: pageSize,
  });

  const shouldShowLoading = isLoading || !isMinLoadingDone;

  // 최소 로딩 시간 보장
  useEffect(() => {
    setIsMinLoadingDone(false);
    const timeout = setTimeout(() => {
      setIsMinLoadingDone(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword]);

  useEffect(() => {
    if (isMobile) setPageSize(6);
    else if (isTablet) setPageSize(4);
    else setPageSize(8);
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (!isLoading && isMinLoadingDone) {
      onLoadingChange(false);
    } else {
      onLoadingChange(true);
    }
  }, [isLoading, isMinLoadingDone, onLoadingChange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  return (
    <div className='flex flex-col gap-24 md:gap-30'>
      <section className='flex flex-col gap-10'>
        <div className='txt-18_M md:txt-24_M'>
          <span className='txt-18_B md:txt-24_B'>{keyword}</span>으로 검색한
          결과입니다.
        </div>
        <p className='txt-14_M md:txt-18_M text-gray-700'>
          총 {totalCount}개의 결과
        </p>
      </section>

      {shouldShowLoading && (
        <div className='flex h-200 items-center justify-center'>
          <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
        </div>
      )}

      {!shouldShowLoading && isError && (
        <p className='txt-18_M text-center text-red-500'>
          데이터를 불러오지 못했어요.
        </p>
      )}

      {!shouldShowLoading && !isError && totalCount === 0 && (
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

      {!shouldShowLoading && !isError && totalCount > 0 && (
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
