'use client';

import {
  useMyActivitiesQuery,
  useMyActReservationDashboard,
} from '@/hooks/reserve-status/useMyActivitiesQuery';

export default function Page() {
  const { data } = useMyActivitiesQuery();
  const { data: reservationDashboard } = useMyActReservationDashboard(
    data?.activities[3].id || 0,
    { year: '2025', month: '07' },
  );

  console.log(data);
  return (
    <div>
      <div className='flex flex-col gap-20'>
        {data?.activities.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
          </div>
        ))}
      </div>

      <div>
        {reservationDashboard?.map((item) => (
          <div key={item.date}>
            <div>{item.date}</div>
            <div>
              <div>{item.reservations.completed}</div>
              <div>{item.reservations.confirmed}</div>
              <div>{item.reservations.pending}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
