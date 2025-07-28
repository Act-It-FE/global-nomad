'use client';

import { useState } from 'react';

import Pagination from '@/components/Pagination';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import CardColumn from './CardColumn';

type Activity = {
  id: number;
  bannerImageUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  category: string;
};

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  const isMobile = useMediaQuery('mobile');
  const isTablet = useMediaQuery('tablet');
  let pageSize = 8;

  if (isMobile) {
    pageSize = 6;
  } else if (isTablet) {
    pageSize = 4;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * pageSize;
  const cardGroup = activities.slice(start, start + pageSize);

  return (
    <section className='flex flex-col gap-12'>
      <div className='grid grid-cols-2 gap-18 md:gap-x-20 md:gap-y-24 lg:grid-cols-4 lg:gap-x-24 lg:gap-y-30'>
        {cardGroup.map((exp) => (
          <CardColumn key={exp.id} {...exp} />
        ))}
      </div>

      <div className='flex justify-center'>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={activities.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
