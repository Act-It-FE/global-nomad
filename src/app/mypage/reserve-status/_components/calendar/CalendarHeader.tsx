import Icon from '@/components/Icon';
import { getMonthName } from '@/utils/dateUtils';

interface CalendarHeaderProps {
  currentMonth: Date;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

export function CalendarHeader({
  currentMonth,
  goToPreviousMonth,
  goToNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className='flex items-center justify-center gap-10 text-black md:gap-30'>
      <button onClick={goToPreviousMonth}>
        <Icon className='size-20 md:size-24' icon='TriangleLeft' />
      </button>
      <span className='txt-16_B md:txt-20_B leading-[normal] tracking-[-0.5px]'>
        {getMonthName(currentMonth)}
      </span>
      <button onClick={goToNextMonth}>
        <Icon className='size-20 md:size-24' icon='TriangleRight' />
      </button>
    </div>
  );
}
