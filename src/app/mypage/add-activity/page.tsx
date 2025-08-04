'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import myActivitiesApi from '@/api/myActivities';
import {
  ActivitiesDetail,
  ActivityRegisterPayload,
  ActivityRegisterSchedule,
} from '@/api/types/activities';
import { CATEGORY, UpdateMyActivityBody } from '@/api/types/myActivities';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ModalProps } from '@/types/Modal';
import { cn } from '@/utils/cn';
import getErrorMessage from '@/utils/getErrorMessage';

import DateInput from './_components/DateInput';
import ImageUploader from './_components/ImageUploader';

const isSameSchedule = (
  sch1: ActivityRegisterSchedule,
  sch2: ActivityRegisterSchedule,
) => {
  return (
    sch1.date === sch2.date &&
    sch1.startTime === sch2.startTime &&
    sch1.endTime === sch2.endTime
  );
};

const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.value)
    e.target.value = Number(
      e.target.value.replace(/[^\d]/g, ''),
    ).toLocaleString('ko-KR');
};

const handleAddress = (e: MouseEvent<HTMLInputElement>) => {
  const input = e.currentTarget;
  // @ts-expect-error : not found type
  new daum.Postcode({
    // @ts-expect-error : not found type
    oncomplete: function (data) {
      input.value = data.address;
    },
  }).open();
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));
  const isMobile = useMediaQuery('mobile');

  const [defaultValue, setDefaultValue] = useState<ActivitiesDetail | null>(
    null,
  );
  const [schedules, setSchedules] = useState<ActivityRegisterSchedule[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [subImages, setSubImages] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalProps | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('price', String(formData.get('price')).replaceAll(',', ''));
    formData.set(
      'category',
      (document.querySelector('input#category') as HTMLInputElement).value,
    );
    if (id) {
      const data: UpdateMyActivityBody = Object.fromEntries(formData.entries());
      data.price = Number(data.price);
      data.bannerImageUrl = bannerImages[0];
      data.scheduleIdsToRemove = [];
      defaultValue?.schedules.forEach((sch) => {
        if (!schedules.find((s) => isSameSchedule(s, sch)))
          data.scheduleIdsToRemove?.push(sch.id);
      });
      data.schedulesToAdd = [];
      schedules.forEach((sch) => {
        if (!defaultValue?.schedules.find((s) => isSameSchedule(s, sch)))
          data.schedulesToAdd?.push(sch);
      });
      data.subImageIdsToRemove = [];
      defaultValue?.subImages.forEach((sub) => {
        if (!subImages.find((s) => s === sub.imageUrl))
          data.subImageIdsToRemove?.push(sub.id);
      });
      data.subImageUrlsToAdd = [];
      subImages.forEach((sub) => {
        if (!defaultValue?.subImages.find((s) => s.imageUrl === sub))
          data.subImageUrlsToAdd?.push(sub);
      });

      try {
        await myActivitiesApi.patch(id, data);
        setModal({
          variant: 'onlyText',
          message: '수정이 완료되었습니다.',
          onClose: () => router.back(),
        });
      } catch (error) {
        setModal({
          variant: 'onlyText',
          message: getErrorMessage(error, '수정에 실패했습니다.'),
          onClose: () => setModal(null),
        });
      }
    } else {
      const data: Partial<ActivityRegisterPayload> = Object.fromEntries(
        formData.entries(),
      );
      data.price = Number(data.price);
      data.schedule = schedules;
      data.bannerImageUrl = bannerImages[0];
      data.subImageUrls = subImages;

      try {
        const response = await activitiesDetailApi.post(
          data as ActivityRegisterPayload,
        );
        setModal({
          variant: 'onlyText',
          message: '체험 등록이 완료되었습니다.',
          onClose: () => router.push('/' + response.id),
        });
      } catch (error) {
        setModal({
          variant: 'onlyText',
          message: getErrorMessage(error, '체험 등록에 실패했습니다.'),
          onClose: () => setModal(null),
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await activitiesDetailApi.getDetail(id);
          setDefaultValue(response);
          setSchedules(
            response.schedules.map((sch) => {
              const { id, ...rest } = sch;
              return rest;
            }),
          );
          setBannerImages([response.bannerImageUrl]);
          setSubImages(response.subImages.map((subimage) => subimage.imageUrl));
        } catch (error) {
          setModal({
            variant: 'onlyText',
            message: getErrorMessage(
              error,
              '체험 정보를 불러오는 데 실패했습니다.',
            ),
            onClose: () => router.back(),
          });
        }
      })();
    }
  }, [id, router]);

  return (
    <>
      <form
        className={cn(
          'mx-auto max-w-760 px-24 py-30 md:px-30 md:py-40',
          'flex flex-col gap-24',
        )}
        onSubmit={handleSubmit}
      >
        <h1 className='txt-18_B h-41 content-center'>내 체험 등록</h1>
        <section className='flex flex-col gap-30'>
          <div className='flex flex-col gap-24'>
            <Input
              defaultValue={defaultValue?.title}
              id='title'
              label='제목'
              name='title'
              placeholder='제목을 입력해 주세요'
            />
            <Input
              defaultValue={defaultValue?.category}
              id='category'
              items={[...CATEGORY]}
              label='카테고리'
              maxHeight='1000px'
              name='category'
              placeholder='카테고리를 선택해 주세요'
              type='dropdown'
            />
            <Input
              defaultValue={defaultValue?.description}
              height={isMobile ? '140px' : '200px'}
              id='description'
              label='설명'
              name='description'
              placeholder='체험에 대한 설명을 입력해 주세요'
              type='textarea'
            />
            <Input
              defaultValue={defaultValue?.price.toLocaleString('ko-KR')}
              id='price'
              label='가격'
              name='price'
              placeholder='체험 금액을 입력해 주세요'
              onChange={handlePriceChange}
            />
            <Input
              readOnly
              defaultValue={defaultValue?.address}
              id='address'
              label='주소'
              name='address'
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
                onClick={(sch) => {
                  setSchedules((prev) => {
                    if (!prev.find((s) => isSameSchedule(s, sch))) {
                      return [...prev, sch].sort((a, b) =>
                        a.date + a.startTime + a.endTime >
                        b.date + b.startTime + b.endTime
                          ? 1
                          : -1,
                      );
                    } else return prev;
                  });
                }}
              />
              {Boolean(schedules.length) && (
                <>
                  <hr className='text-gray-100' />
                  {schedules.map((schedule, index) => (
                    <DateInput
                      key={schedule.date + schedule.endTime}
                      defaultValue={schedule}
                      onClick={() =>
                        setSchedules((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        })
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
            <ImageUploader
              imageURLs={bannerImages}
              max={1}
              setImageURLs={setBannerImages}
            />
          </div>
          <div>
            <label className='txt-16_B leading-19 text-gray-950'>
              소개 이미지 등록
            </label>
            <ImageUploader
              imageURLs={subImages}
              max={4}
              setImageURLs={setSubImages}
            />
          </div>
        </section>
        <Button className='w-120 self-center' size='sm' type='submit'>
          {id ? '수정' : '등록'}하기
        </Button>
      </form>
      {modal && <Modal {...modal} />}
    </>
  );
}
