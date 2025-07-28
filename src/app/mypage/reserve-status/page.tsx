'use client';

import {
  useMyActivitiesQuery,
  // useMyActivitiesReservations,
  // useMyActivitiesReservedSchedule,
  // useMyActReservationDashboard,
} from '@/hooks/reserve-status/useMyActivitiesQuery';
//import { useMyActReservationMutate } from '@/hooks/reserve-status/useMyActReservationMutate';

export default function Page() {
  const { data } = useMyActivitiesQuery();
  // const { data: reservationDashboard } = useMyActReservationDashboard(
  //   data?.activities[0].id || 0,
  //   { year: '2025', month: '07' },
  // );
  // const { data: reservedSchedule } = useMyActivitiesReservedSchedule(
  //   data?.activities[0].id || 0,
  //   { date: '2025-07-28' },
  // );

  // const { data: reservations } = useMyActivitiesReservations(
  //   data?.activities[0].id || 0,
  //   {
  //     scheduleId: reservedSchedule?.[0].scheduleId || 0,
  //     status: 'pending',
  //   },
  // );

  // const { mutate: updateReservation } = useMyActReservationMutate(
  //   data?.activities[0].id || 0,
  //   reservations?.reservations?.[0].id || 0,
  // );

  // const handleApprove = () => {
  //   if (reservations?.reservations?.[0]?.id) {
  //     updateReservation({ status: 'confirmed' });
  //   }
  // };

  // console.log(reservationDashboard);
  // console.log(reservations?.reservations);
  return (
    <div>
      {/* <div>
        <button
          className='mb-4 rounded bg-blue-500 px-4 py-2 text-white'
          onClick={handleApprove}
        >
          승인 테스트
        </button>
      </div>
      <div>
        {reservedSchedule?.map((item) => (
          <div key={item.scheduleId}>
            <div>{item.startTime}</div>
            <div>{item.endTime}</div>
            <div>
              <div>{item.count.declined}</div>
              <div>{item.count.confirmed}</div>
              <div>{item.count.pending}</div>
            </div>
          </div>
        ))}
      </div> */}

      {data?.activities.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}
