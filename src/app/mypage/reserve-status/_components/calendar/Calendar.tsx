'use client';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

export function Calendar() {
  return (
    <div className='flex w-full flex-col gap-8 rounded-3xl bg-white pt-20 pb-10 md:gap-30 md:shadow-[0_4px_24px_0_rgba(156,180,202,0.20)]'>
      <CalendarHeader />

      <CalendarGrid />
    </div>
  );
}
