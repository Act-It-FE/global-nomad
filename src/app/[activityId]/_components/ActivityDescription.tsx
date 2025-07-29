'use client';

import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';

type Props = {
  activityId: number;
};

export default function ActivityDescription({ activityId }: Props) {
  const [description, setDescription] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [subImages, setSubImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchActivityDetail() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const activity = await activitiesDetailApi.getDetail(activityId);

        setDescription(activity.description);
        setBannerImageUrl(activity.bannerImageUrl);
        setSubImages(activity.subImages.map((img) => img.imageUrl));
      } catch (error) {
        console.error('체험 설명을 불러오는데 실패했습니다.', error);
        setErrorMessage('체험 설명을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivityDetail();
  }, [activityId]);

  if (isLoading) {
    return <div className='text-center text-gray-400'>불러오는 중...</div>;
  }

  if (errorMessage) {
    return <div className='text-center text-red-500'>{errorMessage}</div>;
  }

  return (
    <section className='my-40 flex flex-col gap-24'>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
        {bannerImageUrl && (
          <div className='col-span-1 md:col-span-2'>
            <img
              alt='체험 배너 이미지'
              className='h-full w-full rounded-tl-[24px] rounded-bl-[24px] object-cover'
              src={bannerImageUrl}
            />
          </div>
        )}

        <div className='flex flex-col gap-12'>
          {[0, 1].map((index) =>
            subImages[index] ? (
              <img
                key={index}
                alt={`서브 이미지 ${index + 1}`}
                className={`h-full w-full object-cover ${
                  index === 0 ? 'rounded-tr-[24px]' : 'rounded-br-[24px]'
                }`}
                src={subImages[index]}
              />
            ) : null,
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
