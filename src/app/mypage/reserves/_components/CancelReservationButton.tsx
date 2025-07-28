import { useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import Toast from '@/components/Toast';
import { useMyReservationsCancel } from '@/hooks/reservations/useMyReservationsMutate';
import type { ModalProps } from '@/types/Modal';
import getErrorMessage from '@/utils/getErrorMessage';

export default function CancelReservationButton({
  reservationId,
}: {
  reservationId: number;
}) {
  const { mutate: cancelReservation } = useMyReservationsCancel();
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleCancelReservation = () => {
    setModalProps({
      variant: 'warning',
      message: '예약을 취소하시겠어요?',
      onConfirm: () => {
        setModalProps(null);
      },
      onCancel: () => {
        if (reservationId) {
          cancelReservation(
            {
              reservationId: reservationId,
              status: 'canceled',
            },
            {
              onSuccess: () => {
                setToast({
                  message: '예약이 취소되었습니다.',
                  type: 'success',
                });
                setModalProps(null);
              },
              onError: (error) => {
                const errorMessage = getErrorMessage(
                  error,
                  '예약 취소에 실패했습니다. 다시 시도해주세요.',
                );
                setToast({
                  message: errorMessage,
                  type: 'error',
                });
                setModalProps(null);
              },
            },
          );
        }
      },
    });
  };

  const handleToastClose = () => {
    setToast(null);
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </>
  );
}
