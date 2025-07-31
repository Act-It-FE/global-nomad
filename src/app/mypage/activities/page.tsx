'use client';

import Link from 'next/link';

import Button from '@/components/Button';
import { useMyActQuery } from '@/hooks/myActivities/useMyActivitiesQuery';

export default function Page() {
  const {} = useMyActQuery();

  return (
    <div className='flex w-full flex-col gap-15 md:gap-30'>
      <header className='flex items-center justify-between gap-12'>
        <div className='flex flex-col gap-10 py-10'>
          <div className='txt-18_B leading-21 text-gray-950'>내 체험 관리</div>
          <div className='txt-14_M leading-17 text-gray-500'>
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </div>
        </div>
        <Link
          className='rounded-[14px]'
          href='/mypage/add-activity'
          tabIndex={-1}
        >
          <Button className='w-136' size='md'>
            체험 등록하기
          </Button>
        </Link>
      </header>
    </div>
  );
}
