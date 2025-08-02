'use client';

import userApi from '@/api/userApi';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/utils/cn';

import Icon from '../Icon';
import ImageUploader from '../ImageUploader';

export default function Profile() {
  const isTablet = useMediaQuery('tablet');
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const { previewUrl, isUploading, handleChange } = useImageUpload({
    defaultImage: user?.profileImageUrl || '/images/profile-default.svg',
    uploadFn: async (file: File) => {
      try {
        const result = await userApi.uploadProfileImage(file);
        if (!result?.profileImageUrl) {
          throw new Error('업로드된 이미지 URL을 받을 수 없습니다');
        }
        const updated = await userApi.updateMyInfo({
          profileImageUrl: result.profileImageUrl,
        });
        setUser(updated);
        return result.profileImageUrl;
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error);
        throw error;
      }
    },
  });
  const size = isTablet ? 70 : 120;

  if (!user) {
    return (
      <div className='flex h-120 items-center justify-center md:max-lg:h-70'>
        <div className='border-primary-500 size-20 animate-spin rounded-full border-2 border-t-transparent' />
      </div>
    );
  }

  const displayUrl =
    previewUrl && previewUrl.startsWith('blob:')
      ? previewUrl
      : user?.profileImageUrl || '/images/profile-default.svg';

  return (
    <div className='relative h-120 w-120 min-md:max-[1023px]:h-70 min-md:max-[1023px]:w-70'>
      <img
        alt='프로필 이미지'
        className='aspect-square rounded-full object-cover'
        height={size}
        src={displayUrl}
        width={size}
      />

      {isUploading && (
        <div className='absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
          <div className='border-primary-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )}

      <label
        className={cn(
          'absolute flex cursor-pointer items-center justify-center rounded-full bg-gray-300',
          'right-0 bottom-4 h-30 w-30 p-7',
          'md:max-lg:p-5.6 md:max-lg:-right-2.5 md:max-lg:bottom-2 md:max-lg:h-24 md:max-lg:w-24',
        )}
        htmlFor='image-upload'
      >
        <Icon className='md:max-lg:size-12.8 size-16 text-white' icon='Edit' />
      </label>

      <ImageUploader id='image-upload' onChange={handleChange} />
    </div>
  );
}
