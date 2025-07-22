'use client';

import { useState } from 'react';

import Input from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';

export default function Page() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  return (
    <div className='flex w-full flex-col gap-40 p-40'>
      <h2 className='txt-20_B'>Input</h2>
      <article className='flex flex-col gap-20'>
        <Input id='text1' label='text' placeholder='placeholder' />
        <Input errorMessage='error' id='text2' />
        <Input
          id='password1'
          label='password'
          placeholder='placeholder'
          type='password'
        />
        <Input errorMessage='error' id='password2' type='password' />
        <Input
          height='120px'
          id='textarea1'
          label='textarea'
          placeholder='placeholder'
          type='textarea'
        />
        <Input
          errorMessage='error'
          height='120px'
          id='textarea2'
          type='textarea'
        />
        <Input
          id='dropdown'
          items={['one', 'two']}
          label='dropdown'
          placeholder='placeholder'
          type='dropdown'
        />
      </article>
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
