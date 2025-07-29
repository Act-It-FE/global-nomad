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

  // 2장 랜덤 선택 함수
  const getRandomTwo = (arr: string[]) => {
    const unique = Array.from(new Set(arr));
    if (unique.length <= 2) return unique;
    const shuffled = [...unique].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  useEffect(() => {
    async function fetchActivityDetail() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const activity = await activitiesDetailApi.getDetail(activityId);
        setDescription(activity.description);
        setBannerImageUrl(activity.bannerImageUrl);
        const randomSubImages = getRandomTwo(
          activity.subImages.map((img) => img.imageUrl),
        );
        setSubImages(randomSubImages);
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
      <div className='flex w-full gap-12'>
        {bannerImageUrl && (
          <div className='aspect-[6/3] flex-1 overflow-hidden'>
            <img
              alt='배너 이미지'
              className='h-full w-full rounded-tl-[24px] rounded-bl-[24px] object-cover'
              src={bannerImageUrl}
            />
          </div>
        )}

        <div className='flex flex-1 flex-col gap-12'>
          {subImages[0] && (
            <div className='aspect-[6/3] flex-1 overflow-hidden'>
              <img
                alt='서브 이미지 1'
                className='h-full w-full rounded-tr-[24px] object-cover'
                src={subImages[0]}
              />
            </div>
          )}
          {subImages[1] && (
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
