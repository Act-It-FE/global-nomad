'use client';
import Button from '@/components/button/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='m-4 flex flex-col gap-4'>
      <Button
        variant='primary'
        size='xl'
        rounded='16'
        onClick={() => console.log('클릭 시 회원가입')}
      >
        회원가입하기
      </Button>
      <Button
        variant='secondary'
        className='text-14_M h-[47px] max-w-[113px]'
        rounded='12'
      >
        아니오
      </Button>
      <Button
        variant='disable'
        className='text-16_B h-[50px] max-w-[327px]'
        rounded='14'
      >
        예약하기
      </Button>
      <Button variant='editButton' size='xs' rounded='8'>
        수정하기
      </Button>
      <Button variant='deleteButton' size='xs' rounded='8'>
        예약취소
      </Button>
      <Button
        icon={
          <Image
            src='/images/kakao-icon.png'
            alt='카카오아이콘'
            width={24}
            height={24}
          />
        }
        variant='kakaoButton'
        className='text-16_M h-[54px] max-w-[640px]'
        rounded='16'
      >
        카카오 로그인
      </Button>
      <Button
        icon={
          <Image
            src='/images/kakao-icon.png'
            alt='카카오아이콘'
            width={24}
            height={24}
          />
        }
        variant='kakaoButton'
        className='text-16_M h-[54px] max-w-[640px]'
        rounded='16'
      >
        카카오 회원가입
      </Button>
    </div>
  );
}
