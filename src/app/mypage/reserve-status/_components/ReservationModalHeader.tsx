'use client';

import { ReservationStatus } from '@/api/types/myActivities';
import Icon from '@/components/Icon';
import { useMyActReservedSchedule } from '@/hooks/myActivities/useMyActivitiesQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCalendarStore } from '@/stores/calendarStore';
import { formatDate, formatDateKorean } from '@/utils/dateUtils';

export function ReservationModalHeader() {
  const {
    selectedDate,
    setIsModalOpen,
    activeTab,
    setActiveTab,
    selectedActivityId,
  } = useCalendarStore();
  const isPC = useMediaQuery('pc');

  // 선택된 날짜의 상세한 예약 스케줄 데이터 가져오기
  const { data: reservedSchedule } = useMyActReservedSchedule(
    selectedActivityId!,
    { date: formatDate(selectedDate || new Date()) },
    { enabled: !!selectedActivityId },
  );

  // 예약 스케줄 데이터에서 카운트 합계 계산
  const totalCounts = reservedSchedule?.reduce(
    (acc, schedule) => {
      acc.pending += schedule.count.pending;
      acc.confirmed += schedule.count.confirmed;
      acc.declined += schedule.count.declined;
      return acc;
    },
    { pending: 0, confirmed: 0, declined: 0 },
  ) || { pending: 0, confirmed: 0, declined: 0 };

  const tabs = [
    {
      id: 'pending' as ReservationStatus,
      label: '신청',
      count: totalCounts.pending,
    },
    {
      id: 'confirmed' as ReservationStatus,
      label: '승인',
      count: totalCounts.confirmed,
    },
    {
      id: 'declined' as ReservationStatus,
      label: '거절',
      count: totalCounts.declined,
    },
  ];

  return (
    <div className='flex w-full flex-col gap-12'>
      <div className='txt-18_B lg:txt-20_B flex w-full items-center justify-between tracking-[-0.5px]'>
        <span>{selectedDate ? formatDateKorean(selectedDate) : ''}</span>
        {isPC && (
          <button onClick={() => setIsModalOpen(false)}>
            <Icon className='size-24' icon='Delete' />
          </button>
        )}
      </div>

      <div className='flex w-full items-center justify-between'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`h-41 flex-1 border-b-2 px-14 leading-[normal] tracking-[-0.4px] ${
              activeTab === tab.id
                ? 'txt-16_B border-primary-500 text-primary-500 border-b-2'
                : 'txt-16_M text-gray-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab(tab.id);
            }}
          >
            {tab.label} {tab.count}
          </button>
        ))}
      </div>
    </div>
  );
}
