'use client';

import { useImageUpload } from '@/hooks/useImageUpload';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { uploadProfileImage } from '@/libs/upload';

import Icon from '../Icon';
import ImageUploader from '../ImageUploader';

export default function Profile() {
  const isTablet = useMediaQuery('tablet');
  const { previewUrl, isUploading, handleChange } = useImageUpload({
    defaultImage: '/images/profile-default.svg',
    uploadFn: async (file: File) => {
      try {
        const result = await uploadProfileImage(file);
        if (!result?.profileImageUrl) {
          throw new Error('업로드된 이미지 URL을 받을 수 없습니다');
        }
        return result.profileImageUrl;
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error);
        throw error;
      }
    },
  });
  const size = isTablet ? 70 : 120;
  const iconSize = isTablet ? 'size-12.8' : 'size-16';

  return (
    <div className='relative'>
      <img
        alt='프로필 이미지'
        className='aspect-square rounded-full object-cover'
        height={size}
        src={previewUrl}
        width={size}
      />

      {isUploading && (
        <div className='absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          <div className='border-primary-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )}

      <label
        className={`absolute flex cursor-pointer items-center justify-center rounded-full bg-gray-300 ${isTablet ? 'p-5.6 -right-2.5 bottom-2 h-24 w-24' : 'right-0 bottom-4 h-30 w-30 p-7'}`}
        htmlFor='image-upload'
      >
        <Icon className={`${iconSize} text-white`} icon='Edit' />
      </label>

      <ImageUploader id='image-upload' onChange={handleChange} />
    </div>
  );
}
