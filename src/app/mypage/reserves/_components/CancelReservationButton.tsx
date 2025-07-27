import { useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import { useMyReservationsCancel } from '@/hooks/reservations/useMyReservationsMutate';
import type { ModalProps } from '@/types/Modal';

export default function CancelReservationButton({
  reservationId,
}: {
  reservationId: number;
}) {
  const { mutate: cancelReservation } = useMyReservationsCancel();
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const handleCancelReservation = () => {
    setModalProps({
      variant: 'warning',
      message: '예약을 취소하시겠어요?',
      onConfirm: () => {
        setModalProps(null);
      },
      onCancel: () => {
        if (reservationId) {
          cancelReservation({
            reservationId: reservationId,
            status: 'canceled',
          });
        }
        setModalProps(null);
      },
    });
  };

  return (
    <>
      <Button
        className='txt-14_M bg-gray-50 px-10 py-6 text-gray-600 max-lg:w-full'
        rounded='8'
        onClick={handleCancelReservation}
      >
        예약 취소
      </Button>
      {modalProps && <Modal {...modalProps} />}
    </>
  );
}
