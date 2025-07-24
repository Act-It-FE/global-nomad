'use client';
import { useState } from 'react';

import KakaoIcon from '@/assets/icons/kakao.svg';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal/Modal';
import NotificationPanel, {
  Notification,
} from '@/components/common/Notification';
import ICON_MAP from '@/constants/iconMap';
import type { ModalProps } from '@/types/components-types/Modal';

export default function Home() {
  const iconKeys = Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[];

  const [modalProps, setModalProps] = useState<ModalProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const mockNotifications: Notification[] = [
    {
      id: 1,
      content: `예약 승인
함께하면 즐거운 스트릿 댄스
(2023-01-14 15:00~18:00)
예약이 승인되었어요.`,
      createdAt: '2025-07-19T14:20:00.000Z',
    },
    {
      id: 2,
      content: `예약 거절
함께하면 즐거운 스트릿 댄스
(2023-01-14 15:00~18:00)
예약이 거절되었어요.`,
      createdAt: '2025-07-19T14:14:00.000Z',
    },
    {
      id: 3,
      content: `예약 승인
함께하면 즐거운 스트릿 댄스
(2023-01-14 15:00~18:00)
예약이 승인되었어요.`,
      createdAt: '2025-07-19T14:20:00.000Z',
    },
  ];
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
      <div className='grid grid-cols-5 gap-4 bg-gray-300'>
        {iconKeys.map((iconKey) => (
          <div key={iconKey} className='flex flex-col items-center'>
            <Icon className='text-primary-500 size-20' icon={iconKey} />
            <span className='mt-1 text-xs'>{iconKey}</span>
          </div>
        ))}
        <button onClick={() => setIsOpen((prev) => !prev)}>
          알림 {mockNotifications.length}개
        </button>
        <div className='relative inline-block'>
          <NotificationPanel
            list={mockNotifications}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
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
      <Button size='lg' variant='primary'>
        테스트
      </Button>
      <Button className='text-black' size='md' variant='secondary'>
        테스트2
      </Button>
      <Button disabled size='xl'>
        테스트3
      </Button>
      <Button
        disabled
        className='disabled:active:bg-white'
        size='sm'
        variant='secondary'
      >
        테스트4
      </Button>
      <Button
        disabled
        className='rounded-[20px] disabled:active:bg-white'
        icon={<KakaoIcon className='h-24 w-24' />}
        size='xl'
        variant='kakao'
      >
        테스트5
      </Button>
      <Button
        icon={<KakaoIcon className='h-24 w-24' />}
        size='xl'
        variant='kakao'
      >
        테스트6
      </Button>
    </div>
  );
}
