'use client';

import { ReservationStatus } from '@/api/types/myActivities';
import { useMyActReservations } from '@/hooks/myActivities/useMyActivitiesQuery';
import { useMyActReservationMutate } from '@/hooks/myActivities/useMyActReservationMutate';
import { useCalendarStore } from '@/stores/calendarStore';
import { cn } from '@/utils/cn';

export function ReservationList() {
  const { selectedActivityId, selectedTimeSlot, activeTab } =
    useCalendarStore();

  const { data: reservations } = useMyActReservations(
    selectedActivityId || 0,
    {
      scheduleId: selectedTimeSlot || 0,
      status: activeTab as Extract<
        'pending' | 'confirmed' | 'declined',
        ReservationStatus
      >,
    },
    {
      enabled:
        !!selectedActivityId &&
        !!selectedTimeSlot &&
        !!activeTab &&
        ['pending', 'confirmed', 'declined'].includes(activeTab as string),
    },
  );

  // 조건 확인
  if (!activeTab) return null;
  if (!selectedTimeSlot) return <div>시간대를 선택해주세요</div>;

  return (
    <div className='flex max-h-250 w-full flex-col items-start gap-14 overflow-y-auto'>
      <p className='txt-16_B lg:txt-18_B leading-[normal] tracking-[-0.45px]'>
        예약 내역
      </p>

      {reservations?.reservations?.map((reservation) => (
        <div
          key={reservation.id}
          className='flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-16 py-14'
        >
          <div className='txt-14_B lg:txt-16_B flex flex-col gap-10 leading-[normal] tracking-[-0.35px] text-gray-500 lg:tracking-[-0.4px]'>
            <div className='flex items-center gap-8'>
              <p>닉네임</p>
              <span className='txt-14_M lg:txt-16_M truncate text-gray-950'>
                {reservation.nickname}
              </span>
            </div>
            <div className='flex items-center gap-20'>
              <p>인원</p>
              <span className='txt-14_M lg:txt-16_M text-gray-950'>
                {reservation.headCount}명
              </span>
            </div>
          </div>
          {activeTab === 'pending' && (
            <ReservationListButton
              reservationId={reservation.id}
              selectedActivityId={selectedActivityId!}
            />
          )}
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

function ReservationListButton({
  selectedActivityId,
  reservationId,
}: {
  selectedActivityId: number;
  reservationId: number;
}) {
  const { mutate: patchReservations } = useMyActReservationMutate(
    selectedActivityId,
    reservationId,
  );

  return (
    <div className='txt-14_M flex flex-col items-center gap-8 text-gray-600'>
      <button
        className='flex items-center justify-center rounded-lg border border-gray-50 bg-white px-10 py-6 leading-[normal] tracking-[-0.35px]'
        onClick={() => patchReservations({ status: 'confirmed' })}
      >
        승인하기
      </button>
      <button
        className='flex items-center justify-center rounded-lg bg-gray-50 px-10 py-6 leading-[normal] tracking-[-0.35px]'
        onClick={() => patchReservations({ status: 'declined' })}
      >
        거절하기
      </button>
    </div>
  );
}
