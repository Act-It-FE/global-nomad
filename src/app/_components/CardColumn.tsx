import Image from 'next/image';
import Link from 'next/link';

import Icon from '../../components/Icon';

type CardProps = {
  bannerImageUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  id: number;
};

export default function CardColumn({
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
  id,
}: CardProps) {
  const formatted = price.toLocaleString();
  return (
    <Link className='flex w-full flex-col lg:w-262' href={`/${id}`}>
      <div className='relative aspect-[155/177] w-full md:aspect-[332/347] lg:h-290'>
        <Image
          fill
          alt={`${title} 이미지`}
          className='rounded-[18px] object-cover md:rounded-[32px]'
          src={bannerImageUrl}
        />
      </div>
      <article className='relative z-10 mt-[-66px] flex w-full flex-col gap-4 rounded-[18px] bg-white px-17 py-16 text-gray-950 shadow-[-4.5px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)] md:mt-[-76px] md:gap-2 md:rounded-[32px] md:px-30 md:py-20'>
        <h3 className='truncate text-[14px]/18 font-semibold md:text-[18px]/26'>
          {title}
        </h3>
        <div className='flex items-center gap-3 md:gap-5'>
          <Icon className='size-11 text-[#FFC23D] md:size-20' icon='Star' />
          <div className='txt-12_M md:txt-14_M flex items-center leading-18 md:gap-2 md:leading-24'>
            <span>{rating}</span>
            <span className='text-gray-400'>({reviewCount})</span>
          </div>
        </div>
        <div className='pt-6 text-[15px]/18 font-bold md:pt-16 md:text-[18px]/26'>
          <p>
            ₩ {formatted}
            <span className='text-[12px]/18 font-semibold text-gray-400 md:text-[16px]/26'>
              / 인
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
