export type ReservationStatus = 'pending' | 'confirmed' | 'completed';

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  pendingCount?: number; // 대기중
  confirmedCount?: number; // 확정
  declinedCount?: number; // 거절;
  hadReservation?: boolean;
}

export interface CalendarEvent {
  id: string;
  name: string;
  headCount: number;
  time: string;
  status: ReservationStatus;
  date: Date;
}

export interface CalendarProps {
  currentDate?: Date;
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export interface CalendarState {
  currentDate: Date; // 현재 보여주는 월
  selectedDate: Date | null; // 선택된 날짜
}

export interface UseCalendarReturn {
  calendarDates: CalendarDate[]; // 달력에 표시할 모든 날짜들 (42개)
  currentDate: Date; // 현재 보여주는 월
  selectedDate: Date | null; // 선택된 날짜
  goToPreviousMonth: () => void; // 이전 달로 이동하는 함수
  goToNextMonth: () => void; // 다음 달로 이동하는 함수
  selectDate: (date: Date) => void; // 날짜 선택하는 함수
}
