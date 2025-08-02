'use client';

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

export default function DateInput({ defaultValue }: Props) {
  return (
    <div className='flex flex-col gap-10 md:flex-row md:gap-14'>
      {defaultValue ? (
        <Input
          className='w-full'
          id='date'
          type='button'
          value={defaultValue.date.replaceAll('-', '/').slice(2)}
        />
      ) : (
        <div>
          <label
            className='txt-16_M mb-10 inline-block leading-19 text-gray-950 max-md:hidden'
            htmlFor='date'
          >
            날짜
          </label>
          <Input id='date' type='date-custom' />
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
            <Input
              className='md:w-122'
              defaultValue={defaultValue?.startTime}
              id='startTime'
              items={TIME_LIST}
              placeholder='00:00'
              type='dropdown'
            />
            <div className='h-2 w-8 bg-gray-800' />
            <Input
              className='md:w-122'
              defaultValue={defaultValue?.endTime}
              id='endTime'
              items={TIME_LIST}
              placeholder='00:00'
              type='dropdown'
            />
          </div>
        </div>
        <button
          className={cn(
            'size-28 justify-items-center rounded-full md:size-42',
            defaultValue
              ? 'bg-gray-50 text-black'
              : 'bg-primary-500 text-white md:mt-29',
          )}
          type='button'
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
