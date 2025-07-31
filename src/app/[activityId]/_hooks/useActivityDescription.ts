import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';

export function useActivityDescription(activityId: number) {
  const [description, setDescription] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [subImages, setSubImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 중복 제거 후 랜덤 2장 선택
  const getRandomTwo = (arr: string[]) => {
    const unique = Array.from(new Set(arr));
    if (unique.length <= 2) return unique;

    const shuffled = [...unique];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

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

        const imageUrls = activity.subImages.map((img) => img.imageUrl);
        const selected =
          imageUrls.length === 1 ? imageUrls : getRandomTwo(imageUrls);
        setSubImages(selected);
      } catch (error) {
        console.error('체험 설명을 불러오는데 실패했습니다.', error);
        setErrorMessage('체험 설명을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivityDetail();
  }, [activityId]);

  return {
    isLoading,
    errorMessage,
    description,
    bannerImageUrl,
    subImages,
  };
}
