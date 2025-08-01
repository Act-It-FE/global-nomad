'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import Button from '@/components/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import getErrorMessage from '@/utils/getErrorMessage';

import ActivityDescription from './_components/ActivityDescription';
import ActivityReviews from './_components/ActivityReviews';
import ActivitySummary from './_components/ActivitySummary';
import LoadKakaoMap from './_components/LoadKakaoMap';
import ReserveCalender from './_components/ReserveCalender';
import TabletReserveModal from './_components/TabletReserveModal';

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const isPC = useMediaQuery('pc');
  const isTablet = useMediaQuery('tablet');

  useEffect(() => {
    if (!activityId) return;

    const id = Number(activityId);
    if (isNaN(id)) {
      setError('잘못된 체험 ID입니다.');
      return;
    }

    const fetchData = async () => {
      try {
        const activity = await activitiesDetailApi.getDetail(id);
        setAddress(activity.address);
      } catch (error) {
        const message = getErrorMessage(
          error,
          '체험 정보를 불러오지 못했습니다.',
        );
        console.error('실패:', message);
        setError(message);
      }
    };

    fetchData();
  }, [activityId]);

  if (error) {
    return (
      <div className='flex h-200 items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  if (!address) {
    return (
      <div className='flex h-200 items-center justify-center text-gray-500'>
        <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
      </div>
    );
  }

  return (
    <main className='w-full'>
      <div className='flex flex-col px-24 md:px-30 lg:flex-row lg:items-start lg:gap-x-40'>
        <div className='flex flex-1 flex-col gap-40'>
          <section>
            <ActivityDescription activityId={Number(activityId)} />
            {isTablet && (
              <>
                <div className='mt-20 w-full rounded-[16px] border border-gray-200 p-20'>
                  <Button
                    className='w-full'
                    onClick={() => setIsReserveModalOpen(true)}
                  >
                    날짜 선택하기
                  </Button>
                </div>
                {isReserveModalOpen && (
                  <TabletReserveModal
                    activityId={Number(activityId)}
                    onClose={() => setIsReserveModalOpen(false)}
                  />
                )}
              </>
            )}
          </section>
          <section>
            <LoadKakaoMap address={address} />
          </section>
          <section>
            <ActivityReviews activityId={Number(activityId)} />
          </section>
        </div>
        <aside className='mt-40 w-full shrink-0 lg:mt-0 lg:w-[410px]'>
          <ActivitySummary activityId={Number(activityId)} />
          <section className='mt-40'>
            {isPC && <ReserveCalender activityId={Number(activityId)} />}
          </section>
        </aside>
      </div>
    </main>
  );
}
