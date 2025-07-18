'use client';

import { useState } from 'react';

import Pagination from '@/components/common/Pagination';
export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <div className='flex h-500 items-center justify-center'>
      <Pagination
        currentPage={page}
        pageSize={10}
        totalCount={215}
        onPageChange={setPage}
      />
    </div>
  );
}
