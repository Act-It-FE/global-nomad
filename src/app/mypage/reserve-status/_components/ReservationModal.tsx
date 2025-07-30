'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useCalendarStore } from '@/stores/calendarStore';

import { ReservationDropDown } from './ReservationDropDown';
import { ReservationModalHeader } from './ReservationModalHeader';

export function ReservationModal() {
  const { isModalOpen, setIsModalOpen, setSelectedTimeSlot } =
    useCalendarStore();

  // 모달이 열릴 때 selectedTimeSlot 초기화 (한 번만 실행)
  useEffect(() => {
    if (isModalOpen) {
      setSelectedTimeSlot(null);
    }
  }, [isModalOpen, setSelectedTimeSlot]);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div
      className='bg-opacity-50 fixed inset-0 z-100 flex items-end justify-center bg-black/50 lg:top-300 lg:left-650 lg:items-center lg:bg-transparent'
      onClick={() => setIsModalOpen(false)} // 배경 클릭 시 모달 닫기
    >
      <div
        className='card-shadow relative h-397 w-full rounded-t-[30px] bg-white leading-[normal] lg:h-fit lg:w-340 lg:rounded-[30px]'
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        <div className='flex w-full flex-col items-start gap-30 px-24 py-30'>
          <ReservationModalHeader />
          <ReservationModalContent />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ReservationModalContent() {
  return (
    <div className='h-fit w-full'>
      <ReservationDropDown />
    </div>
  );
}
