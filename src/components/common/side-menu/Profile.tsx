import Image from 'next/image';
import { useState } from 'react';

import { uploadProfileImage } from '@/libs/upload'; // 업로드 함수 임포트

import Icon from '../Icon';

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string>('');

  // 이미지 선택 시 실행
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 임시 미리보기용 URL 생성 (실제 업로드 전에 보여주기)
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    uploadProfileImage(file).then((url) => {
      console.log('서버에서 받은 이미지 URL:', url);
      if (url) {
        setProfileImage(url);
      } else {
        // 업로드 실패 혹은 URL 없음 시 미리보기 유지 또는 에러 처리
        alert('이미지 업로드에 실패했습니다.');
      }
    });
  };

  return (
    <div className='relative'>
      <Image
        priority
        unoptimized
        alt='프로필 이미지'
        className='aspect-square rounded-full object-cover'
        height={120}
        quality={100}
        src={profileImage || '/images/profile-default.svg'}
        width={120}
      />
      <label
        className='absolute right-0 bottom-4 cursor-pointer rounded-full bg-gray-300 p-3 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]'
        htmlFor='profile-upload'
      >
        <Icon className='size-16 text-white' icon='Edit' />
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
