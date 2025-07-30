import Image from 'next/image';

import Button from '@/components/Button';
import type { WarningModalProps } from '@/types/Modal';

export function WarningContent({
  message,
  onConfirm,
  onCancel,
  cancleText = '취소하기',
  confirmText = '아니오',
}: WarningModalProps) {
  const warning = '/images/warning.png';
  return (
    <div className='flex w-320 flex-col items-center justify-center rounded-[30px] bg-white p-24 md:w-400 md:p-30'>
      <div className='relative h-49 w-49 md:h-88 md:w-88'>
        <Image fill alt='경고' src={warning} />
      </div>
      <p className='txt-16_B md:txt-18_B mb-20 md:mb-24'>{message}</p>
      <div className='flex gap-8 md:gap-12'>
        <Button
          className='txt-14_M md:txt-16_M h-41 w-113 rounded-[12px] md:h-47 md:w-135 md:rounded-[14px]'
          variant='secondary'
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
        <Button
          className='md:s-200 txt-14_B md:txt-16_B h-41 w-113 md:h-47 md:w-135'
          variant='primary'
          onClick={onCancel}
        >
          {cancleText}
        </Button>
      </div>
    </div>
  );
}
