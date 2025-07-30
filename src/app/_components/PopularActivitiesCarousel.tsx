'use client';

import { TouchEvent, useEffect, useState } from 'react';

import { Activity } from '@/api/types/activities';
import Icon from '@/components/Icon';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import CardColumn from './CardColumn';

type ActivityCard = Omit<
  Activity,
  'description' | 'address' | 'userId' | 'createdAt' | 'updatedAt'
>;

type CarouselProps = {
  activities: ActivityCard[];
};

export default function PopularActivitiesCarousel({
  activities,
}: CarouselProps) {
  const [index, setIndex] = useState(0);

  const isMobile = useMediaQuery('mobile');
  const isTablet = useMediaQuery('tablet');

  const visibleSlides = isMobile || isTablet ? 2 : 4; // 한번에 보여줄 카드 개수
  const movementCorrection = isTablet ? 10 : 6; // gap으로 인한 보정값

  const maxIndex = activities.length - visibleSlides;

  // 스와이프 로직 (모바일 전용)
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (Math.abs(e.touches[0].clientX - startX) > 10) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !isSwiping) return;

    const endX = e.changedTouches[0].clientX;
    if (startX > endX) {
      handleNextClick();
    } else {
      handlePrevClick();
    }
    setStartX(0);
    setIsSwiping(false);
  };

  const handlePrevClick = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  useEffect(() => {
    setIndex(0);
  }, [visibleSlides]);

  return (
    <div className='relative'>
      <div className='w-full overflow-hidden'>
        <div
          className='flex gap-12 transition-transform duration-300 ease-in-out md:gap-20 lg:gap-24'
          style={{
            transform: `translateX(calc(-${index} * (100% / ${visibleSlides}) - ${index * movementCorrection}px))`,
          }}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              className='w-[calc((100%-12px)/2)] flex-none md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-72px)/4)]'
            >
              <CardColumn {...activity} />
            </div>
          ))}
        </div>
      </div>

      {!isMobile && (
        <>
          {index > 0 && (
            <button
              className='card-shadow absolute top-1/2 -left-27 z-10 flex size-54 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(0,0,0,0.3)] bg-white hover:bg-gray-100'
              onClick={handlePrevClick}
            >
              <Icon className='size-24' icon='ArrowLeft' />
            </button>
          )}
          {index < maxIndex && (
            <button
              className='card-shadow absolute top-1/2 -right-27 z-10 flex size-54 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(0,0,0,0.3)] bg-white hover:bg-gray-100'
              onClick={handleNextClick}
            >
              <Icon className='size-24' icon='ArrowRight' />
            </button>
          )}
        </>
      )}
    </div>
  );
}
