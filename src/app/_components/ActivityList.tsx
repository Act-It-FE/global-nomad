'use client';

import { Activity } from '@/api/types/activities';
import Pagination from '@/components/Pagination';

import CardColumn from './CardColumn';

type ActivityCard = Omit<
  Activity,
  'description' | 'address' | 'userId' | 'createdAt' | 'updatedAt'
>;

type ActivityListProps = {
  activities: ActivityCard[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
};

export default function ActivityList({
  activities,
  totalCount,
  currentPage,
  onPageChange,
  pageSize,
}: ActivityListProps) {
  return (
    <section className='flex flex-col gap-12'>
      <div className='grid grid-cols-2 gap-18 md:gap-x-20 md:gap-y-24 lg:grid-cols-4 lg:gap-x-24 lg:gap-y-30'>
        {activities.map((exp) => (
          <CardColumn key={exp.id} {...exp} />
        ))}
      </div>

      <div className='flex justify-center'>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
