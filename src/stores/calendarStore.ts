import { create } from 'zustand';

import { FindReservationsByMonthResponse } from '@/api/types/myActivities';

type ReservationData = FindReservationsByMonthResponse[0]['reservations'];

interface CalendarState {
  selectedDate: Date | null; // 선택된 날짜
  currentDate: Date; // 현재 표시하는 월
  reservations: Record<string, ReservationData>; // 예약 데이터

  setSelectedDate: (date: Date | null) => void;
  setCurrentDate: (date: Date) => void;
  setReservations: (reservations: Record<string, ReservationData>) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: null,
  currentDate: new Date(),
  reservations: {},

  setSelectedDate: (date) => set({ selectedDate: date }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setReservations: (reservations) => set({ reservations }),
}));
