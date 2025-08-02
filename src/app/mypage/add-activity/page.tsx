'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { ActivityRegisterSchedule } from '@/api/types/activities';
import { CATEGORY } from '@/api/types/myActivities';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import DateInput from './_components/DateInput';

const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.value)
    e.target.value = Number(
      e.target.value.replace(/[^\d]/g, ''),
    ).toLocaleString('ko-KR');
};

const handleAddress = (e: MouseEvent<HTMLInputElement>) => {
  // @ts-expect-error : not found type
  new daum.Postcode({
    // @ts-expect-error : not found type
    oncomplete: function (data) {
      e.currentTarget.value = data.address;
    },
  }).open();
};

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isMobile = useMediaQuery('mobile');

  const [schedules, setSchedules] = useState<ActivityRegisterSchedule[]>([]);

  return (
    <form
      className={cn(
        'mx-auto max-w-760 px-24 py-30 md:px-30 md:py-40',
        'flex flex-col gap-24',
      )}
    >
      <h1 className='txt-18_B h-41 content-center'>내 체험 등록</h1>
      <section className='flex flex-col gap-30'>
        <div className='flex flex-col gap-24'>
          <Input id='title' label='제목' placeholder='제목을 입력해 주세요' />
          <Input
            id='category'
            items={[...CATEGORY]}
            label='카테고리'
            maxHeight='1000px'
            placeholder='카테고리를 선택해 주세요'
            type='dropdown'
          />
          <Input
            height={isMobile ? '140px' : '200px'}
            id='description'
            label='설명'
            placeholder='체험에 대한 설명을 입력해 주세요'
            type='textarea'
          />
          <Input
            id='price'
            label='가격'
            placeholder='체험 금액을 입력해 주세요'
            onChange={handlePriceChange}
          />
          <Input
            readOnly
            id='address'
            label='주소'
            placeholder='주소를 입력해 주세요'
            onClick={handleAddress}
          />
        </div>
        <div className='flex flex-col gap-18'>
          <label className='txt-16_B leading-19 text-gray-950'>
            예약 가능한 시간대
          </label>
          <div className='flex flex-col gap-16 md:gap-20'>
            <DateInput
              onClick={(sch) => setSchedules((prev) => [...prev, sch])}
            />
            {Boolean(schedules.length) && (
              <>
                <hr className='text-gray-100' />
                {schedules.map((schedule) => (
                  <DateInput
                    key={schedule.date + schedule.endTime}
                    defaultValue={schedule}
                    onClick={(sch) =>
                      setSchedules((prev) =>
                        prev.filter(
                          (ele) =>
                            !(
                              ele.date === sch.date &&
                              ele.startTime === sch.startTime &&
                              ele.endTime === sch.endTime
                            ),
                        ),
                      )
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div>
          <label className='txt-16_B leading-19 text-gray-950'>
            배너 이미지 등록
          </label>
        </div>
        <div>
          <label className='txt-16_B leading-19 text-gray-950'>
            소개 이미지 등록
          </label>
        </div>
      </section>
      <Button className='w-120' size='sm'>
        {id ? '수정' : '등록'}하기
      </Button>
    </form>
  );
}
