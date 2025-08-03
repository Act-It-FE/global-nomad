'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { ActivityRegisterSchedule } from '@/api/types/activities';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { cn } from '@/utils/cn';

const TIME_LIST = Array.from(
  { length: 24 },
  (_, index) => `${String(index).padStart(2, '0')}:00`,
);

interface Props {
  defaultValue?: ActivityRegisterSchedule;
  onClick: (param: ActivityRegisterSchedule) => void;
}

export default function DateInput({ defaultValue, onClick }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(defaultValue ? false : true);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateString =
      e.target.value.length < 10
        ? '20' + e.target.value.replaceAll('/', '-')
        : e.target.value;
    if (
      e.target.validity.valid &&
      dateString === new Date(dateString).toISOString().slice(0, 10)
    ) {
      setErrorMessage('');
      setDisabled(false);
    } else {
      setErrorMessage('yy/mm/dd 형식으로 입력해주세요');
      setDisabled(true);
    }
  };

  const handleClick = () => {
    const inputs = ref.current?.querySelectorAll('input');
    const obj = defaultValue ?? { date: '', startTime: '', endTime: '' };
    inputs?.forEach((input) => {
      obj[input.id as keyof ActivityRegisterSchedule] = input.value;
      input.value = '';
    });
    onClick(obj);
  };

  return (
    <div
      ref={ref}
      className='flex flex-col items-start gap-10 md:flex-row md:gap-14'
    >
      {defaultValue ? (
        <Input
          className='w-full'
          id='date'
          type='button'
          value={
            defaultValue.date.length > 8
              ? defaultValue.date.replaceAll('-', '/').slice(2)
              : defaultValue.date.replaceAll('-', '/')
          }
        />
      ) : (
        <div>
          <label
            className='txt-16_M mb-10 inline-block leading-19 text-gray-950 max-md:hidden'
            htmlFor='date'
          >
            날짜
          </label>
          <Input
            errorMessage={errorMessage}
            id='date'
            type='date-custom'
            onChange={handleChange}
          />
        </div>
      )}
      <div className='flex items-center gap-14'>
        <div>
          {defaultValue ? null : (
            <div className='mb-10 flex justify-between max-md:hidden'>
              <label className='txt-16_M inline-block leading-19 text-gray-950 max-md:hidden'>
                시작 시간
              </label>
              <label className='txt-16_M inline-block w-122 leading-19 text-gray-950 max-md:hidden'>
                종료 시간
              </label>
            </div>
          )}
          <div className='flex items-center gap-10'>
            {defaultValue ? (
              <Input
                className='md:w-122'
                defaultValue={defaultValue.startTime}
                id='startTime'
                placeholder='00:00'
                type='button'
              />
            ) : (
              <Input
                className='md:w-122'
                id='startTime'
                items={TIME_LIST}
                placeholder='00:00'
                type='dropdown'
              />
            )}
            <div className='h-2 w-8 bg-gray-800' />
            {defaultValue ? (
              <Input
                className='md:w-122'
                defaultValue={defaultValue.endTime}
                id='endTime'
                placeholder='00:00'
                type='button'
              />
            ) : (
              <Input
                className='md:w-122'
                id='endTime'
                items={TIME_LIST}
                placeholder='00:00'
                type='dropdown'
              />
            )}
          </div>
        </div>
        <button
          className={cn(
            'size-28 justify-items-center rounded-full md:size-42',
            defaultValue
              ? 'bg-gray-50 text-black'
              : 'bg-primary-500 text-white md:mt-29',
          )}
          disabled={disabled}
          type='button'
          onClick={handleClick}
        >
          <Icon
            className='size-16 md:size-24'
            icon={defaultValue ? 'Minus' : 'Plus'}
          />
        </button>
      </div>
    </div>
  );
}
