import Image from 'next/image';
import { useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { uploadProfileImage } from '@/libs/upload'; // 업로드 함수 임포트

import Icon from '../Icon';

export default function Profile() {
  const isTablet = useMediaQuery('(min-width: 744px) and (max-width: 1023px)');
  const [profileImage, setProfileImage] = useState<string>('');
  const size = isTablet ? 70 : 120; // 프로필 이미지 크기 설정

  const [isUploading, setIsUploading] = useState(false);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // 임시 미리보기용 URL 생성 (실제 업로드 전에 보여주기)
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    setIsUploading(true);
    uploadProfileImage(file)
      .then((url) => {
        // 이전 미리보기 URL 해제
        URL.revokeObjectURL(imageUrl);
        if (url) {
          setProfileImage(url);
        } else {
          // 더 나은 에러 피드백 방식 사용 (토스트 메시지 등)
          console.error('이미지 업로드 실패: URL이 반환되지 않음');
        }
      })
      .catch((error) => {
        console.error('이미지 업로드 에러:', error);
        // 실패 시 미리보기 URL 해제
        URL.revokeObjectURL(imageUrl);
        setProfileImage('/images/profile-default.svg');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div className='relative'>
      <Image
        priority
        unoptimized
        alt='프로필 이미지'
        className='aspect-square rounded-full object-cover'
        height={size}
        quality={100}
        src={profileImage || '/images/profile-default.svg'}
        width={size}
      />
      {/* 로딩 중일 때 스피너 표시 */}
      {isUploading && (
        <div className='absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          <svg
            className='text-primary-500 h-10 w-10 animate-spin'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              fill='none'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              fill='currentColor'
            />
          </svg>
        </div>
      )}
      <label
        className='absolute right-0 bottom-4 cursor-pointer rounded-full bg-gray-300 p-3 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]'
        htmlFor='profile-upload'
      >
        <Icon
          className={`${isTablet ? 'size-12.5' : 'size-16'} text-white`}
          icon='Edit'
        />
      </label>
      <input
        accept='image/*'
        className='hidden'
        id='profile-upload'
        type='file'
        onChange={handleImageChange}
      />
    </div>
  );
}
