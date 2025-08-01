'use client';

import { ChangeEvent, useState } from 'react';

import EyeIcon from '@/assets/icons/eye_off.svg';
import Modal from '@/components/Modal/Modal';
import { cn } from '@/utils/cn';

const COMMON_STYLE = cn(
  'size-80 md:size-126 lg:size-128',
  'rounded-lg md:rounded-2xl border border-gray-100',
);

export default function ImageUploader({ max }: { max: number }) {
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files?.length > max) {
      setModalMessage(`파일은 최대 ${max}개까지만 업로드 할 수 있습니다.`);
    }
    e.target.value = '';
  };

  return (
    <>
      <div className='flex gap-12 md:gap-14'>
        <label
          className={cn(
            COMMON_STYLE,
            'flex flex-col items-center justify-center gap-2 md:gap-10',
          )}
        >
          <EyeIcon className='size-40 text-gray-400' />
          <div className='txt-13_M md:txt-14_M leading-[calc(1em+3px)] text-gray-600'>
            /{max > 0 ? max : 1}
          </div>
          <input
            hidden
            multiple={max > 1}
            type='file'
            onChange={handleChange}
          />
        </label>
      </div>
      {modalMessage && (
        <Modal
          message={modalMessage}
          variant='onlyText'
          onClose={() => setModalMessage('')}
        />
      )}
    </>
  );
}
