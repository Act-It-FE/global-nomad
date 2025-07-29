import { getCalendarDates, isSameDate } from '@/utils/dateUtils';

import { DayCell } from './DayCell';

interface CalendarGridProps {
  currentDate: Date; // 현재 월
  selectedDate?: Date | null; // 선택된 날짜
  onDateSelect?: (date: Date) => void; // 날짜 클릭 시
  onDateDeselect?: () => void; // 선택 해제 시
}
export function CalendarGrid({
  currentDate,
  selectedDate,
  onDateSelect,
  onDateDeselect,
}: CalendarGridProps) {
  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div>
      <div className='mb-12 flex justify-between self-stretch'>
        {weekDay.map((day) => (
          <div
            key={day}
            className='txt-16_B flex-1 items-center justify-center p-12 text-center leading-[normal] tracking-[-0.4px] text-gray-900'
          >
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 bg-white'>
        {getCalendarDates(currentDate).map((date) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            isCurrentMonth={date.getMonth() === currentDate.getMonth()}
            isSelected={selectedDate ? isSameDate(date, selectedDate) : false}
            onClick={onDateSelect}
            onDeselect={onDateDeselect}
          />
        ))}
      </div>
    </div>
  );
}
