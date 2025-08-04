import { createContext, ReactNode, useContext } from 'react';

import { MyReservation } from '@/api/types/reservations';

// Context 생성
const ReservesCardContext = createContext<MyReservation | null>(null);

// Context 사용을 위한 훅
function useReservesCard() {
  const context = useContext(ReservesCardContext);
  if (!context) {
    throw new Error('ReservesCard 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
}

// 메인 컨테이너
export default function ReservesCard({
  children,
  reservesInfo,
}: {
  children: ReactNode;
  reservesInfo: MyReservation;
}) {
  return (
    <ReservesCardContext.Provider value={reservesInfo}>
      <div className='relative flex items-stretch'>{children}</div>
    </ReservesCardContext.Provider>
  );
}

//썸네일 컴포넌트
ReservesCard.Thumbnail = function Thumbnail() {
  const reservesInfo = useReservesCard();

  return (
    <div className='flex-shrink-0 self-stretch rounded-[0_32px_32px_0] bg-gray-300 bg-cover bg-center bg-no-repeat'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt='thumbnail'
        className='h-full w-181 rounded-[0_32px_32px_0] object-cover max-lg:w-136'
        src={reservesInfo.activity?.bannerImageUrl || '/images/logo-lg.png'}
        onError={(e) => {
          e.currentTarget.src = '/images/logo-lg.png';
        }}
      />
    </div>
  );
};

//내부 컴포넌트
ReservesCard.Content = function Content({ children }: { children: ReactNode }) {
  return (
    <div className='z-10 -mr-26 flex flex-[1_0_0] flex-col items-start justify-between rounded-4xl bg-white px-40 py-30 shadow-[0_4px_24px_0_rgba(156,180,202,0.20)] max-lg:p-20'>
      {children}
    </div>
  );
};

ReservesCard.Heading = function Heading({ children }: { children: ReactNode }) {
  return <div className='flex flex-col items-start gap-12'>{children}</div>;
};
