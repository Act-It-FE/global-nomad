import { MyReservation } from '@/api/types/reservations';

export default function ReservesCard({
  reservesInfo,
}: {
  reservesInfo: MyReservation;
}) {
  return <div>{reservesInfo.activity?.title}</div>;
}
