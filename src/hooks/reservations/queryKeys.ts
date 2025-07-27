import { GetReservationsParams } from '@/api/types/reservations';

export default function reservationsQueryKeys() {
  const all = ['reservations'] as const;

  return {
    all, // 전체 예약(루트)
    list: (params: GetReservationsParams) => [...all, 'list', params] as const, // 예약 목록(페이지/필터별)
    detail: (id: number) => [...all, 'detail', id] as const, // 예약 상세(id별)
  };
}
