'use client';

import { isAxiosError } from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import EyeIcon from '@/assets/icons/eye_off.svg';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal/Modal';
import { cn } from '@/utils/cn';

const COMMON_STYLE = cn(
  'size-80 md:size-126 lg:size-128',
  'rounded-lg md:rounded-2xl border border-gray-100',
);

interface Props {
  max: number;
  imageURLs: string[];
  setImageURLs: Dispatch<SetStateAction<string[]>>;
}

export default function ImageUploader({ max, imageURLs, setImageURLs }: Props) {
  const [modalMessage, setModalMessage] = useState('');

  const addImage = async (file: File) => {
    try {
      const response = await activitiesDetailApi.uploadImage(file);
      setImageURLs((prev) => [...prev, response.activityImageUrl]);
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.status) {
          case 401:
            setModalMessage('로그인이 필요합니다.');
            return;
          case 413:
            setModalMessage('파일이 너무 큽니다.');
            return;
        }
      }
      setModalMessage('파일을 업로드 하는 중 오류가 발생했습니다.');
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files?.length &&
      e.target.files?.length > max - imageURLs.length
    ) {
      setModalMessage(`파일은 최대 ${max}개까지만 업로드 할 수 있습니다.`);
    } else if (e.target.files) {
      for (const file of e.target.files) {
        addImage(file);
      }
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
            {imageURLs.length}/{max > 0 ? max : 1}
          </div>
          <input
            hidden
            accept='image/*'
            disabled={imageURLs.length >= max}
            multiple={max > 1}
            type='file'
            onChange={handleChange}
          />
        </label>
        {imageURLs.map((url, index) => (
          <div
            key={url}
            className={cn(COMMON_STYLE, 'relative bg-cover')}
            style={{ backgroundImage: `url(${url})` }}
          >
            <button
              className={cn(
                'absolute -top-4 -right-4 lg:-top-6',
                'size-20 justify-items-center rounded-full bg-gray-950 md:size-26',
              )}
              onClick={() =>
                setImageURLs((prev) => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1),
                ])
              }
            >
              <Icon className='size-16 text-white md:size-20' icon='Delete' />
            </button>
          </div>
        ))}
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
