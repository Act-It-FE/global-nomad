'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ActivityBasic } from '@/api/types/myActivities';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal/Modal';
import { useMyActDelete } from '@/hooks/myActivities/useMyActReservationMutate';
import { cn } from '@/utils/cn';

export default function MyExperience({ data }: { data: ActivityBasic }) {
  const { mutate } = useMyActDelete(data.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        className={cn(
          'flex justify-between gap-22 lg:items-center',
          'w-full rounded-3xl p-24 lg:p-30',
          'card-shadow bg-white',
        )}
      >
        <div className='text-gray-950'>
          <div className='txt-16_B lg:txt-18_B leading-[calc(1em+3px)]'>
            {data.title}
          </div>
          <div className='mt-6 flex items-center gap-2 lg:mt-8'>
            <Icon className='text-yellow size-14 lg:size-16' icon='Star' />
            <div className='txt-13_M lg:txt-16_M leading-[calc(1em+3px)] text-gray-500'>
              {data.rating} ({data.reviewCount})
            </div>
          </div>
          <div className='mt-10 flex items-center gap-4 lg:mt-12'>
            <div className='txt-16_B lg:txt-18_B leading-[calc(1em+3px)]'>
              ￦{data.price.toLocaleString('ko-KR')}
            </div>
            <div className='txt-14_M lg:txt-16_M leading-[calc(1em+3px)] text-gray-400'>
              / 인
            </div>
          </div>
          <div className='txt-14_M mt-12 flex gap-8 leading-17 text-gray-600 lg:mt-20'>
            <Link
              className='rounded-lg border border-gray-50 px-9 py-5'
              href={`/mypage/${data.id}`}
            >
              수정하기
            </Link>
            <button
              className='rounded-lg bg-gray-50 px-10 py-6'
              type='button'
              onClick={() => setIsModalOpen(true)}
            >
              삭제하기
            </button>
          </div>
        </div>
        <img //Image로 변경 필요
          alt='banner image'
          className='size-82 rounded-[20px] object-cover lg:size-142 lg:rounded-[30px]'
          src={data.bannerImageUrl}
        />
      </article>
      {isModalOpen && (
        <Modal
          message='삭제하시겠습니까?'
          variant='warning'
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => mutate()}
        />
      )}
    </>
  );
}
