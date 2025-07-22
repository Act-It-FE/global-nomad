'use client';

import { useState } from 'react';

import Pagination from '@/components/common/Pagination';

export default function Page() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  return (
    <div className='flex flex-col gap-20 p-40'>
      <h2 className='txt-20_B'>Pagination</h2>
      <article className='flex flex-col items-center'>
        <Pagination
          currentPage={page1}
          pageSize={5}
          totalCount={320}
          onPageChange={(p) => setPage1(p)}
        />
        <Pagination
          currentPage={page2}
          pageSize={5}
          totalCount={15}
          onPageChange={(p) => setPage2(p)}
        />
      </article>
    </div>
  );
}
