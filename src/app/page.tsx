'use client';
import DropDown from '@/components/common/DropDown';
import Icon from '@/components/common/Icon';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modals/Modals';
import ICON_MAP from '@/constants/iconMap';
import type { ModalProps } from '@/types/Modals';

export default function Home() {
  const iconKeys = Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[];

  const [modalProps, setModalProps] = useState<ModalProps | null>(null);
  return (
    <div className='m-20 flex flex-col items-center justify-center'>
      <DropDown
        items={[
          {
            text: '마이페이지',
            onClick: (e) => console.log('마이페이지', e),
          },
          {
            text: '로그아웃',
            danger: true,
            onClick: (e) => console.log('로그아웃', e),
          },
        ]}
        position='left'
        trigger={<Icon className='h-28 w-28' icon='More' />}
      />
      <div className='grid grid-cols-5 gap-4'>
        {iconKeys.map((iconKey) => (
          <div key={iconKey} className='flex flex-col items-center'>
            <Icon className='text-primary-500 size-20' icon={iconKey} />
            <span className='mt-1 text-xs'>{iconKey}</span>
          </div>
        ))}
      </div>

      <Button
        rounded='14'
        variant='primary'
        onClick={() =>
          setModalProps({
            variant: 'onlyText',
            message: '등록이 완료되었습니다.',
            onClose: () => setModalProps(null),
          })
        }
      >
        텍스트 모달 열기
      </Button>
      <Button
        variant='primary'
        onClick={() =>
          setModalProps({
            variant: 'warning',
            message: '정말 이 페이지를 나가시겠습니까?',
            onCancel: () => setModalProps(null),
            onConfirm: () => {
              setModalProps(null);
            },
          })
        }
      >
        경고 모달 열기
      </Button>

      <Button
        variant='primary'
        onClick={() =>
          setModalProps({
            variant: 'review',
            activityName: '체험 제목',
            activitySchedule: '체험 스케줄',
            onSubmit: (rating, comment) => {
              console.log(rating, comment);
              setModalProps(null);
            },
            onClose: () => setModalProps(null),
          })
        }
      >
        입력 모달 열기
      </Button>
      {modalProps && <Modal {...modalProps} />}
    </div>
  );
}
