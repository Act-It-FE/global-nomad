'use client';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function CloudBackground({ children }: { children: ReactNode }) {
  return (
    <div
      className='relative overflow-hidden'
      style={{
        background: 'linear-gradient(180deg, #BDF 0%, #F7FBFF 30%, #FFF 100%)',
      }}
    >
      {/* 구름 이미지들 */}
      <Image
        alt='구름'
        className='absolute top-[2%] right-[25%]'
        height={27}
        src='/images/cloud.png'
        width={71}
      />
      <Image
        alt='구름'
        className='absolute top-[6%] right-[10%]'
        height={52}
        src='/images/cloud.png'
        width={138}
      />
      <Image
        alt='구름'
        className='absolute top-[18%] right-[5%] hidden md:block'
        height={27}
        src='/images/cloud.png'
        width={71}
      />
      <Image
        alt='구름'
        className='absolute top-[9%] left-[50%]'
        height={40}
        src='/images/cloud.png'
        width={105}
      />
      <Image
        alt='구름'
        className='absolute top-[2.5%] left-[15%]'
        height={40}
        src='/images/cloud.png'
        width={105}
      />
      <Image
        alt='구름'
        className='absolute top-[8%] left-[5%]'
        height={40}
        src='/images/cloud.png'
        width={105}
      />
      <Image
        alt='구름'
        className='absolute top-[15%] left-[-3%] hidden md:block'
        height={40}
        src='/images/cloud.png'
        width={105}
      />
      <Image
        alt='구름'
        className='absolute top-[20%] left-[10%] hidden lg:block'
        height={40}
        src='/images/cloud.png'
        width={105}
      />

      <div>{children}</div>
    </div>
  );
}
