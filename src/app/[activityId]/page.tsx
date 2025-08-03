'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUserStore } from '@/stores/userStore';
import getErrorMessage from '@/utils/getErrorMessage';

import ActivityDescription from './_components/ActivityDescription';
import ActivityDetailImage from './_components/ActivityDetailImage';
import ActivityReviews from './_components/ActivityReviews';
import ActivitySummary from './_components/ActivitySummary';
import LoadKakaoMap from './_components/LoadKakaoMap';
import MobileReserveModal from './_components/MobileReserveModal';
import ReserveCalender from './_components/ReserveCalender';
import TabletReserveModal from './_components/TabletReserveModal';

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [creatorId, setCreatorId] = useState<number | null>(null);

  const user = useUserStore((state) => state.user);
  const myUserId = user?.id;

  const isPC = useMediaQuery('pc');
  const isTablet = useMediaQuery('tablet');
  const isMobile = useMediaQuery('mobile');

  useEffect(() => {
    if (!activityId || Array.isArray(activityId)) notFound();
    const id = Number(activityId);
    if (isNaN(id)) notFound();

    const fetchData = async () => {
      try {
        const activity = await activitiesDetailApi.getDetail(id);
        setAddress(activity.address);
        setPrice(activity.price);
        setCreatorId(activity.userId);
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

  const isMyActivity = myUserId !== undefined && myUserId === creatorId;

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
    <>
      <main className='w-full'>
        <div className='flex flex-col px-24 md:px-30 lg:flex-row lg:items-start lg:gap-x-40'>
          <div className='flex flex-1 flex-col gap-40'>
            {isTablet || isMobile ? (
              <>
                <ActivityDetailImage activityId={Number(activityId)} />
                <ActivitySummary activityId={Number(activityId)} />
                <ActivityDescription activityId={Number(activityId)} />

                <div>
                  <div className='flex flex-row justify-between'>
                    <p className='txt-18_B'>
                      ₩ {price?.toLocaleString()}
                      <span className='txt-16_M leading-19 text-gray-300'>
                        {' '}
                        / 1명
                      </span>
                    </p>
                    <button
                      className='txt-16_B text-primary-500 underline'
                      onClick={() => {
                        if (isMyActivity) {
                          alert('내가 생성한 체험은 예약할 수 없습니다.');
                        } else {
                          setIsReserveModalOpen(true);
                        }
                      }}
                    >
                      날짜 선택하기
                    </button>
                  </div>
                  <Button disabled className='mt-10 h-50 w-full'>
                    예약하기
                  </Button>
                </div>

                {isReserveModalOpen && (
                  <>
                    {isTablet ? (
                      <TabletReserveModal
                        activityId={Number(activityId)}
                        onClose={() => setIsReserveModalOpen(false)}
                        onReserved={() => {
                          setIsReserveModalOpen(false);
                          setIsSuccessModalOpen(true);
                        }}
                      />
                    ) : (
                      <MobileReserveModal
                        activityId={Number(activityId)}
                        onClose={() => setIsReserveModalOpen(false)}
                        onReserved={() => {
                          setIsReserveModalOpen(false);
                          setIsSuccessModalOpen(true);
                        }}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <ActivityDetailImage activityId={Number(activityId)} />
                <ActivityDescription activityId={Number(activityId)} />
              </>
            )}

            <LoadKakaoMap address={address} />
            <ActivityReviews activityId={Number(activityId)} />
          </div>

          {isPC && (
            <aside className='mt-40 w-full shrink-0 lg:mt-0 lg:w-410'>
              <ActivitySummary activityId={Number(activityId)} />
              <section className='mt-40'>
                <ReserveCalender
                  activityId={Number(activityId)}
                  onReserved={() => setIsSuccessModalOpen(true)}
                />
              </section>
            </aside>
          )}
        </div>
      </main>

      {isSuccessModalOpen && (
        <Modal
          message='예약이 완료되었습니다!'
          variant='onlyText'
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </>
  );
}
