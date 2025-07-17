'use client';
import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/button/Button';
import Icon from '@/components/common/Icon';
import type {
  InputModalProps,
  OnlyTextModalProps,
  WarningModalProps,
} from '@/types/Modals';

export function OnlyTextContent({ message, onClose }: OnlyTextModalProps) {
  return (
    <div className='flex h-140 w-320 flex-col items-center justify-center gap-20 rounded-[30px] bg-white pt-10 md:h-170 md:w-400 md:gap-16'>
      <p className='text-16_B md:text-18_B'>{message}</p>
      <Button
        className='text-14_B md:text-16_B h-41 w-180 md:h-47 md:w-200'
        rounded='14'
        variant='primary'
        onClick={onClose}
      >
        확인
      </Button>
    </div>
  );
}
export function WarningContent({
  message,
  onConfirm,
  onCancel,
}: WarningModalProps) {
  return (
    <div className='flex w-320 flex-col items-center justify-center rounded-[30px] bg-white p-24 pt-10 md:w-400 md:p-30'>
      <div className='relative h-49 w-49 md:h-88 md:w-88'>
        <Image fill alt='경고' src='/images/warning.png' />
      </div>
      <p className='text-16_B md:text-18_B mb-20 md:mb-24'>{message}</p>
      <div className='flex gap-8 md:gap-12'>
        <Button
          className='text-14_M md:text-16_M h-41 w-113 rounded-[12px] md:h-47 md:w-135 md:rounded-[14px]'
          variant='secondary'
          onClick={onConfirm}
        >
          아니오
        </Button>
        <Button
          className='md:s-200 text-14_B md:text-16_B h-41 w-113 md:h-47 md:w-135'
          variant='primary'
          onClick={onCancel}
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}
export function InputContent({
  activityName,
  activitySchedule,
  defaultRating,
  defaultComment,
  onSubmit,
}: InputModalProps) {
  const [rating, setRating] = useState(defaultRating);
  const [comment, setComment] = useState(defaultComment);
  const MAX_LENGTH = 100;
  return (
    <div className='flex h-493 w-321 flex-col items-center justify-center rounded-[30px] bg-white pt-10 md:h-549 md:w-385'>
      <p className='text-14_B md:text-16_B text-black'>{activityName}</p>
      <p className='text-13_M md:text-14_M pt-6 pb-14 text-gray-500'>
        {activitySchedule}
      </p>
      <div className='flex justify-center'>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= rating ? 'text-yellow' : 'text-gray-100'}
            onClick={() => setRating(n)}
          >
            <Icon className='size-36 md:size-42' icon='Star' />
          </span>
        ))}
      </div>
      <div className='mb-20 flex w-273 flex-col md:mb-30 md:w-325'>
        <p className='text-16_B md:text-18_B pt-20 md:pt-30'>
          소중한 경험을 들려주세요
        </p>
        <textarea
          className='mt-31 mb-8 h-179 w-full resize-none rounded-xl border border-gray-100 p-20 focus:outline-none md:mt-16'
          maxLength={MAX_LENGTH}
          placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className='text-13_M flex justify-end text-gray-600'>
          <span className='text-13_M text-gray-600'>{comment.length}</span>
          <span className='text-13_M text-gray-600'>/</span>
          <span className='text-13_M text-gray-600'>{MAX_LENGTH}</span>
        </div>
      </div>
      <div className='flex w-273 gap-8 md:w-325 md:gap-12'>
        <Button
          className='md:s-200 text-14_B md:text-16_B h-41 w-full md:h-47'
          rounded='14'
          variant='primary'
          onClick={() => onSubmit(rating, comment)}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
