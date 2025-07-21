'use client';

import DropDown from '@/components/common/DropDown';
import Icon from '@/components/common/Icon';

export default function Home() {
  return (
    <div className='m-20 flex flex-col items-center justify-center'>
      <DropDown
        items={[
          {
            text: '마이페이지',
            onClick: (e) => console.log('마이페이지', e),
          },
          {
            text: '로그아웃',
            danger: true,
            onClick: (e) => console.log('로그아웃', e),
          },
        ]}
        position='left'
        trigger={<Icon className='h-28 w-28' icon='More' />}
      />
    </div>
  );
}
