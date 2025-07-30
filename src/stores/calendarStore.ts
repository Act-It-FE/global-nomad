import { create } from 'zustand';

import {
  FindReservationsByMonthResponse,
  ReservationStatus,
} from '@/api/types/myActivities';

type ReservationData = FindReservationsByMonthResponse[0]['reservations'];

interface CalendarState {
  selectedDate: Date | null;
  currentDate: Date;
  reservations: Record<string, ReservationData>;
  isModalOpen: boolean;
  selectedActivityId: number | null;
  activeTab: ReservationStatus;
  selectedTimeSlot: number | null; // 선택된 시간대 ID

  setSelectedDate: (date: Date | null) => void;
  setCurrentDate: (date: Date) => void;
  setReservations: (reservations: Record<string, ReservationData>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedActivityId: (activityId: number | null) => void;
  setActiveTab: (tab: ReservationStatus) => void;
  setSelectedTimeSlot: (timeSlotId: number | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: null,
  currentDate: new Date(),
  reservations: {},
  isModalOpen: false,
  selectedActivityId: null,
  activeTab: 'pending',
  selectedTimeSlot: null,

  setSelectedDate: (date) => set({ selectedDate: date }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setReservations: (reservations) => set({ reservations }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setSelectedActivityId: (activityId) =>
    set({ selectedActivityId: activityId }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedTimeSlot: (timeSlotId) => set({ selectedTimeSlot: timeSlotId }),
}));
