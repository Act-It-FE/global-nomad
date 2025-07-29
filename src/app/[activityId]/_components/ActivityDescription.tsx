'use client';

import { useActivityDescription } from '@/hooks/activity-details/useActivityDescription';

type Props = {
  activityId: number;
};

export default function ActivityDescription({ activityId }: Props) {
  const { description, bannerImageUrl, subImages, errorMessage, isLoading } =
    useActivityDescription(activityId);

  const isSingleSubImage = subImages.length === 1;

  if (isLoading) {
    return <div className='text-center text-gray-400'>불러오는 중...</div>;
  }

  if (errorMessage) {
    return <div className='text-center text-red-500'>{errorMessage}</div>;
  }

  return (
    <section className='my-40 flex flex-col gap-24'>
      <div className='flex w-full gap-12'>
        {bannerImageUrl && (
          <div
            className={`overflow-hidden ${
              isSingleSubImage ? 'aspect-[6/3] w-1/2' : 'aspect-[6/3] flex-1'
            }`}
          >
            <img
              alt='배너 이미지'
              className='h-full w-full rounded-tl-[24px] rounded-bl-[24px] object-cover'
              src={bannerImageUrl}
            />
          </div>
        )}

        <div
          className={`flex ${
            isSingleSubImage ? 'w-1/2' : 'flex-1'
          } flex-col gap-12`}
        >
          {subImages[0] && (
            <div
              className={`overflow-hidden ${
                isSingleSubImage ? 'aspect-[6/3]' : 'aspect-[6/3] flex-1'
              }`}
            >
              <img
                alt='서브 이미지 1'
                className={`h-full w-full ${
                  subImages.length === 1
                    ? 'rounded-tr-[24px] rounded-br-[24px]'
                    : 'rounded-tr-[24px]'
                } object-cover`}
                src={subImages[0]}
              />
            </div>
          )}
          {subImages[1] && !isSingleSubImage && (
            <div className='aspect-[6/3] flex-1 overflow-hidden'>
              <img
                alt='서브 이미지 2'
                className='h-full w-full rounded-br-[24px] object-cover'
                src={subImages[1]}
              />
            </div>
          )}
        </div>
      </div>

      <div className='md:txt-18_B txt-16_B'>체험 설명</div>
      <p className='txt-16_M whitespace-pre-line text-gray-950'>
        {description}
      </p>
    </section>
  );
}
