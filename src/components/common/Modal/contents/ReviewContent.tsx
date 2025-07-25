import { useState } from 'react';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import type { ReviewModalProps } from '@/types/components/Modal';

export function ReviewContent({
  activityName,
  activitySchedule,
  defaultRating = 0,
  defaultComment = '',
  onSubmit,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [comment, setComment] = useState(defaultComment);
  const MAX_LENGTH = 100;
  return (
    <div className='flex h-493 w-321 flex-col items-center justify-center rounded-[30px] bg-white md:h-549 md:w-385'>
      <button className='self-end px-24 md:px-30' onClick={onClose}>
        <Icon
          className='size-24 text-black hover:cursor-pointer'
          icon='Delete'
        />
      </button>
      <p className='txt-14_B md:txt-16_B text-black'>{activityName}</p>
      <p className='txt-13_M md:txt-14_M pt-6 pb-14 text-gray-500'>
        {activitySchedule}
      </p>
      <div className='flex justify-center'>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= rating ? 'text-yellow' : 'text-gray-100'}
            onClick={() => setRating(n)}
          >
            <Icon
              className='size-36 hover:cursor-pointer md:size-42'
              icon='Star'
            />
          </span>
        ))}
      </div>
      <div className='mb-20 flex w-273 flex-col md:mb-30 md:w-325'>
        <p className='txt-16_B md:txt-18_B pt-20 md:pt-30'>
          소중한 경험을 들려주세요
        </p>
        <textarea
          className='placeholder:txt-14-M md:placeholder:txt-16-M card-shadow mt-12 mb-8 h-179 w-full resize-none rounded-xl border border-gray-100 p-20 focus:outline-none md:mt-16'
          maxLength={MAX_LENGTH}
          placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className='txt-13_M flex justify-end text-gray-600'>
          <span className='txt-13_M text-gray-600'>
            {comment.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>
      <Button
        className='txt-14_B md:txt-16_B h-41 w-273 md:h-47 md:w-325'
        rounded='14'
        variant='primary'
        onClick={() => onSubmit(rating, comment)}
      >
        작성하기
      </Button>
    </div>
  );
}
