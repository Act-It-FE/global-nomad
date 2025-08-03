'use client';

import { useActivityDescription } from '@/app/[activityId]/_hooks/useActivityDescription';
import {
  getImageColumnWrapperClass,
  getSubImageClass,
} from '@/app/[activityId]/_utils/getImageClass';

type Props = {
  activityId: number;
};

export default function ActivityDetailImage({ activityId }: Props) {
  const { bannerImageUrl, subImages, isLoading, errorMessage } =
    useActivityDescription(activityId);

  const isSingleSubImage = subImages.length === 1;

  if (isLoading || errorMessage) return null;

  return (
    <section className='flex w-full gap-12'>
      {bannerImageUrl && (
        <div
          className={`aspect-[6/3] overflow-hidden ${
            subImages.length === 0 ? 'w-full' : 'w-1/2'
          }`}
        >
          <img
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

      {subImages.length > 0 && (
        <div
          className={`flex ${getImageColumnWrapperClass(isSingleSubImage)} flex-col gap-12`}
        >
          {subImages[0] && (
            <div
              className={`${
                subImages.length === 1
                  ? 'h-full flex-1 overflow-hidden'
                  : 'aspect-[6/3] flex-1 overflow-hidden'
              }`}
            >
              <img
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
              <img
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
    </section>
  );
}
