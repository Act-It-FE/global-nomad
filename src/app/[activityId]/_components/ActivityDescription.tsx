'use client';

import { useActivityDescription } from '@/app/[activityId]/_hooks/useActivityDescription';

type Props = {
  activityId: number;
};

export default function ActivityDescription({ activityId }: Props) {
  const { description, isLoading, errorMessage } =
    useActivityDescription(activityId);

  if (isLoading) {
    return (
      <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
    );
  }

  if (errorMessage) {
    return <div className='text-center text-red-500'>{errorMessage}</div>;
  }

  return (
    <section className='flex flex-col gap-24'>
      <div className='md:txt-18_B txt-16_B'>체험 설명</div>
      <p className='txt-16_M whitespace-pre-line text-gray-950'>
        {description}
      </p>
    </section>
  );
}
