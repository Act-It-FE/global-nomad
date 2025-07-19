'use client';

import DropDown from '@/components/common/DropDown';
export default function Home() {
  return (
    <div>
      <DropDown
        firstText='마이페이지'
        secondText='로그아웃'
        onClickFirst={() => console.log('마이페이지')}
        onClickSecond={() => console.log('로그아웃')}
      />
      <DropDown
        firstText='수정하기'
        secondText='삭제하기'
        onClickFirst={() => console.log('수정하기')}
        onClickSecond={() => console.log('삭제하기')}
      />
    </div>
  );
}
