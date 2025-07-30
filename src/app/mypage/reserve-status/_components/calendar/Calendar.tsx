'use client';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

export function Calendar() {
  return (
    <div className='card-shadow flex w-full flex-col gap-8 rounded-3xl bg-white pt-20 pb-10 md:gap-30'>
      <CalendarHeader />

      <CalendarGrid />
    </div>
  );
}
