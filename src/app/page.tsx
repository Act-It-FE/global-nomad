'use client';

import DropDown from '@/components/common/DropDown';
import Icon from '@/components/common/Icon';

export default function Home() {
  return (
    <div className='m-20 flex flex-col items-center justify-center'>
      <DropDown
        firstText='마이페이지'
        position='bottom'
        secondText='로그아웃'
        trigger={<Icon className='h-28 w-28' icon='More' />}
        onClickFirst={() => console.log('마이페이지')}
        onClickSecond={() => console.log('로그아웃')}
      />
    </div>
  );
}
