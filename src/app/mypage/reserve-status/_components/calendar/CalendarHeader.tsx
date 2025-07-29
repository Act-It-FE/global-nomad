import Icon from '@/components/Icon';
import { useCalendarStore } from '@/stores/calendarStore'; // 추가
import { getMonthName } from '@/utils/calendar';

export function CalendarHeader() {
  const { currentDate, setCurrentDate } = useCalendarStore(); // store 사용

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  return (
    <div className='flex items-center justify-center gap-10 text-black md:gap-30'>
      <button onClick={handlePreviousMonth}>
        <Icon className='size-20 md:size-24' icon='TriangleLeft' />
      </button>
      <span className='txt-16_B md:txt-20_B leading-[normal] tracking-[-0.5px]'>
        {getMonthName(currentDate)}
      </span>
      <button onClick={handleNextMonth}>
        <Icon className='size-20 md:size-24' icon='TriangleRight' />
      </button>
    </div>
  );
}
