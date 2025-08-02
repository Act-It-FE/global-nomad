'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

import { CATEGORY } from '@/api/types/myActivities';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.value)
    e.target.value = Number(
      e.target.value.replace(/[^\d]/g, ''),
    ).toLocaleString('ko-KR');
};

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const isMobile = useMediaQuery('mobile');

  return (
    <form
      className={cn(
        'mx-auto max-w-760 px-24 py-30 md:px-30 md:py-40',
        'flex flex-col gap-24',
      )}
    >
      <h1 className='txt-18_B h-41 content-center'>내 체험 등록</h1>
      <section className='flex flex-col gap-30'>
        <div className='flex flex-col gap-24'>
          <Input id='title' label='제목' placeholder='제목을 입력해 주세요' />
          <Input
            id='category'
            items={[...CATEGORY]}
            label='카테고리'
            maxHeight='1000px'
            placeholder='카테고리를 선택해 주세요'
            type='dropdown'
          />
          <Input
            height={isMobile ? '140px' : '200px'}
            id='description'
            label='설명'
            placeholder='체험에 대한 설명을 입력해 주세요'
            type='textarea'
          />
          <Input
            id='price'
            label='가격'
            placeholder='체험 금액을 입력해 주세요'
            onChange={handlePriceChange}
          />
        </div>
        <div />
        <div />
        <div />
      </section>
      <Button className='w-120' size='sm'>
        {id ? '수정' : '등록'}하기
      </Button>
    </form>
  );
}
