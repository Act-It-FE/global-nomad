import { ReservationStatus } from '@/api/types/myActivities';

// activeTab에 따른 개수 계산 함수
export const getCountByTab = (
  count: { pending: number; confirmed: number; declined: number },
  tab: ReservationStatus,
): number => {
  switch (tab) {
    case 'pending':
      return count.pending;
    case 'confirmed':
      return count.confirmed;
    case 'declined':
      return count.declined;
    default:
      return 0;
  }
};

// 시간대 텍스트 포맷팅 함수
export const formatTimeSlotText = (time: string, count: number): string => {
  return `${time} (${count}개)`;
};
