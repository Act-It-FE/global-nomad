import Image from 'next/image';

import Icon from '../Icon';

export default function Profile() {
  const profileImage = '';

  return (
    <div className='relative'>
      <Image
        alt='프로필 이미지'
        height={120}
        src={profileImage ? profileImage : '/images/profile-default.svg'}
        width={120}
      />
      <button className='absolute right-0 bottom-4 rounded-full bg-gray-300 p-7 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]'>
        <Icon className='size-16 text-white' icon='Edit' />
      </button>
    </div>
  );
}
