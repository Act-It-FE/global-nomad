'use client';

import FallbackImage from '@/app/[activityId]/_components/FallbackImage';
import { useActivityDescription } from '@/app/[activityId]/_hooks/useActivityDescription';
import {
  getImageColumnWrapperClass,
  getSubImageClass,
} from '@/app/[activityId]/_utils/getImageClass';

type Props = {
  activityId: number;
};

export default function ActivityDetailImage({ activityId }: Props) {
  const { bannerImageUrl, subImages, errorMessage, isLoading } =
    useActivityDescription(activityId);

  const isSingleSubImage = subImages.length === 1;

  if (isLoading) {
    return (
      <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
    );
  }

  if (errorMessage) {
    return <div className='text-center text-red-500'>{errorMessage}</div>;
  }

  const showOnlyFallbackImage =
    !bannerImageUrl && (!subImages || subImages.length === 0);

  return (
    <section className='flex w-full gap-12'>
      {showOnlyFallbackImage ? (
        <div className='aspect-[6/3] w-full overflow-hidden rounded-[24px]'>
          <FallbackImage
            alt='기본 이미지'
            className='h-full w-full object-cover'
            src=''
          />
        </div>
      ) : (
        <>
          {/* 배너 이미지 */}
          {bannerImageUrl && (
            <div
              className={`aspect-[6/3] overflow-hidden ${
                subImages.length === 0 ? 'w-full' : 'w-1/2'
              }`}
            >
              <FallbackImage
                alt='배너 이미지'
                className={`h-full w-full rounded-tl-[24px] object-cover ${
                  subImages.length === 0
                    ? 'rounded-tr-[24px] rounded-br-[24px] rounded-bl-[24px]'
                    : 'rounded-bl-[24px]'
                }`}
                src={bannerImageUrl}
              />
            </div>
          )}

          {/* 서브 이미지 */}
          {subImages.length > 0 && (
            <div
              className={`flex flex-col gap-12 ${getImageColumnWrapperClass(
                isSingleSubImage,
              )}`}
            >
              {subImages[0] && (
                <div
                  className={`${
                    isSingleSubImage
                      ? 'h-full flex-1 overflow-hidden'
                      : 'aspect-[6/3] flex-1 overflow-hidden'
                  }`}
                >
                  <FallbackImage
                    alt='서브 이미지 1'
                    className={getSubImageClass({
                      isSingle: isSingleSubImage,
                      isFirst: true,
                      isLast: subImages.length === 1,
                    })}
                    src={subImages[0]}
                  />
                </div>
              )}
              {subImages[1] && !isSingleSubImage && (
                <div className='aspect-[6/3] flex-1 overflow-hidden'>
                  <FallbackImage
                    alt='서브 이미지 2'
                    className={getSubImageClass({
                      isSingle: false,
                      isFirst: false,
                      isLast: true,
                    })}
                    src={subImages[1]}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
