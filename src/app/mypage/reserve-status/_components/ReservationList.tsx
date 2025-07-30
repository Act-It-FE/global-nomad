'use client';

import { ReservationStatus } from '@/api/types/myActivities';
import { useMyActReservations } from '@/hooks/myActivities/useMyActivitiesQuery';
import { useCalendarStore } from '@/stores/calendarStore';
import { cn } from '@/utils/cn';

// 탭별 제목 가져오기
// const getTabTitle = (activeTab: string | null) => {
//   switch (activeTab) {
//     case 'pending':
//       return '신청 예약';
//     case 'confirmed':
//       return '승인 예약';
//     case 'declined':
//       return '거절 예약';
//     default:
//       return '';
//   }
// };

export function ReservationList() {
  const { selectedActivityId, selectedTimeSlot, activeTab } =
    useCalendarStore();

  const { data: reservations } = useMyActReservations(
    selectedActivityId!,
    {
      scheduleId: selectedTimeSlot!,
      status: activeTab as Extract<
        'pending' | 'confirmed' | 'declined',
        ReservationStatus
      >,
    },
    { enabled: !!selectedActivityId && !!selectedTimeSlot && !!activeTab },
  );

  // 조건 확인
  if (!activeTab) return null;
  if (!selectedTimeSlot) return <div>시간대를 선택해주세요</div>;

  // 콘솔로 데이터 확인
  console.log('reservations:', reservations);

  return (
    <div className='flex h-fit w-full flex-col items-start gap-14 overflow-y-auto'>
      <p className='txt-16_B lg:txt-18_B leading-[normal] tracking-[-0.45px]'>
        예약 내역
      </p>

      {reservations?.reservations?.map((reservation) => (
        <div
          key={reservation.id}
          className='flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-16 py-14'
        >
          <div>
            <p className='flex justify-between'>
              닉네임 <span>{reservation.nickname}</span>{' '}
            </p>
            <p className='flex justify-between'>
              인원 <span>{reservation.headCount}명</span>
            </p>
          </div>
          {activeTab === 'pending' && <ReservationListButton />}
          {activeTab !== 'pending' && (
            <ReservationListBadge activeTab={activeTab} />
          )}
        </div>
      ))}
    </div>
  );
}

function ReservationListBadge({ activeTab }: { activeTab: ReservationStatus }) {
  const badgeColor = {
    confirmed: 'bg-[#DDF9F9] text-[#1790A0]',
    declined: 'bg-[#FCECEA] text-[#F96767]',
  };

  const badgeText = {
    confirmed: '예약 승인',
    declined: '예약 거절',
  };

  return (
    <div
      className={cn(
        `txt-13_B flex items-center justify-center rounded-full px-8 py-4`,
        badgeColor[activeTab as keyof typeof badgeColor],
      )}
    >
      {badgeText[activeTab as keyof typeof badgeText]}
    </div>
  );
}

function ReservationListButton({}) {
  return (
    <div>
      <button className='txt-16_M leading-[normal] tracking-[-0.45px]'>
        승인하기
      </button>
      <button className='txt-16_M leading-[normal] tracking-[-0.45px]'>
        거절하기
      </button>
    </div>
  );
}
