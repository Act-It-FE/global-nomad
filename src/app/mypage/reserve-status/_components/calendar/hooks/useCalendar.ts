// hooks/useCalendar.ts

import { useCallback, useMemo, useState } from 'react';

import {
  CalendarDate,
  CalendarEvent,
  CalendarState,
  UseCalendarReturn,
} from '../types';
import { getCalendarDates, isSameDate } from '../utils/dateUtils';

interface UseCalendarProps {
  currentDate?: Date;
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
}

export function useCalendar({
  currentDate = new Date(),
  events = [],
  onDateSelect,
}: UseCalendarProps): UseCalendarReturn {
  // 1. 상태 관리
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(currentDate),
    selectedDate: null,
  });

  // 2. 달력 날짜들 생성
  const calendarDates = useMemo((): CalendarDate[] => {
    const dates = getCalendarDates(state.currentDate);

    return dates.map((date) => {
      // 해당 날짜의 예약들 필터링
      const dayEvents = events.filter((event) => isSameDate(event.date, date));

      // 예약 개수 계산
      const pendingCount = dayEvents.filter(
        (e) => e.status === 'pending',
      ).length;
      const confirmedCount = dayEvents.filter(
        (e) => e.status === 'confirmed',
      ).length;
      const completedCount = dayEvents.filter(
        (e) => e.status === 'completed',
      ).length;

      return {
        date,
        isCurrentMonth: date.getMonth() === state.currentDate.getMonth(),
        isSelected: state.selectedDate
          ? isSameDate(date, state.selectedDate)
          : false,
        isDisabled: false,
        pendingCount: pendingCount || undefined,
        confirmedCount: confirmedCount || undefined,
        completedCount: completedCount || undefined,
        hadReservation: dayEvents.length > 0,
      };
    });
  }, [state.currentDate, state.selectedDate, events]);

  // 3. 월 이동 함수들
  const goToPreviousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() - 1,
        1,
      ),
    }));
  }, []);

  const goToNextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() + 1,
        1,
      ),
    }));
  }, []);

  // 4. 날짜 선택 함수
  const selectDate = useCallback(
    (date: Date) => {
      setState((prev) => ({
        ...prev,
        selectedDate: date,
      }));
      onDateSelect?.(date);
    },
    [onDateSelect],
  );

  return {
    calendarDates,
    currentDate: state.currentDate,
    selectedDate: state.selectedDate,
    goToPreviousMonth,
    goToNextMonth,
    selectDate,
  };
}
