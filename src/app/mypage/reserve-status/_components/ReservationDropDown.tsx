import { useEffect, useMemo } from 'react';

import {
  formatTimeSlotText,
  getCountByTab,
} from '@/app/mypage/reserve-status/_utils/reservationUtils';
import Input from '@/components/Input';
import { useMyActReservedSchedule } from '@/hooks/myActivities/useMyActivitiesQuery';
import { useCalendarStore } from '@/stores/calendarStore';
import { formatDate } from '@/utils/dateUtils';

export function ReservationDropDown() {
  const { selectedActivityId, selectedDate, setSelectedTimeSlot, activeTab } =
    useCalendarStore();

  // 선택된 날짜의 예약 스케줄 데이터 가져오기
  const { data: reservedSchedule } = useMyActReservedSchedule(
    selectedActivityId!,
    { date: formatDate(selectedDate || new Date()) },
    { enabled: !!selectedActivityId },
  );

  // 선택된 탭에 따라 해당 상태의 예약이 있는 시간대만 필터링
  const timeSlots = useMemo(() => {
    // activeTab이 null이면 빈 배열 반환
    if (!activeTab) return [];

    return (
      reservedSchedule
        ?.filter((schedule) => {
          // activeTab에 따라 해당 상태의 예약이 있는지 확인
          return getCountByTab(schedule.count, activeTab) > 0;
        })
        .map((schedule) => ({
          id: schedule.scheduleId,
          time: `${schedule.startTime} - ${schedule.endTime}`,
          count: schedule.count,
        })) || []
    );
  }, [reservedSchedule, activeTab]);

  // activeTab이 변경될 때 selectedTimeSlot 초기화
  useEffect(() => {
    setSelectedTimeSlot(null);
  }, [activeTab, setSelectedTimeSlot]);

  return (
    <div className='flex w-full flex-col items-start gap-12'>
      <p className='txt-16_B lg:txt-18_B leading-[normal] tracking-[-0.45px]'>
        예약 시간
      </p>
      <div className='w-full'>
        {!activeTab ? (
          <div className='txt-16_M p-16 text-center text-gray-400'>
            먼저 예약 상태를 선택해주세요
          </div>
        ) : (
          <Input
            key={activeTab}
            id='time-dropdown'
            items={timeSlots.map((slot) => formatTimeSlotText(slot.time))}
            placeholder='시간대 선택'
            type='dropdown'
            onDropdownSelect={(index) => {
              const selectedSlot = timeSlots[index];
              setSelectedTimeSlot(selectedSlot?.id || null);
            }}
          />
        )}
      </div>
    </div>
  );
}
