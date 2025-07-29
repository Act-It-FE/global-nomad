import { useCalendarStore } from '@/stores/calendarStore';
import { getCalendarDates } from '@/utils/dateUtils';

import { DayCell } from './DayCell';

export function CalendarGrid() {
  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  const { currentDate } = useCalendarStore();

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
          />
        ))}
      </div>
    </div>
  );
}
