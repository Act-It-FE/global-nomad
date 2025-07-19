// components/NotificationPanel.tsx
'use client';
import Icon from '@/components/common/Icon';
import { useState, useRef } from 'react';

// 알림 타입 정의
interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  //   {
  //     id: 1,
  //     content: `예약 승인
  // 함께하면 즐거운 스트릿 댄스
  // (2023-01-14 15:00~18:00)
  // 예약이 승인되었어요.`,
  //     createdAt: '2025-07-19T14:20:00.000Z',
  //   },
  //   {
  //     id: 2,
  //     content: `예약 거절
  // 함께하면 즐거운 스트릿 댄스
  // (2023-01-14 15:00~18:00)
  // 예약이 거절되었어요.`,
  //     createdAt: '2025-07-19T14:14:00.000Z',
  //   },
];

export default function NotificationPanel() {
  const [list] = useState<Notification[]>(mockNotifications);
  const totalCount = list.length;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='rounded border px-3 py-1 hover:bg-gray-100'
      >
        알림 {totalCount}개
      </button>

      {open && (
        <div
          ref={panelRef}
          className='absolute right-0 mt-2 flex h-326 w-231 flex-col rounded-[10px] bg-white shadow-lg'
        >
          <div className='flex items-center justify-between border-b-[1px] border-gray-100 px-20 py-16'>
            <span className='txt-16_B'>알림 {totalCount}개</span>
            <button
              onClick={() => setOpen(false)}
              className='hover:text-gray-600'
            >
              <Icon className='size-20' icon='Delete' />
            </button>
          </div>

          <ul className='flex-1 overflow-y-auto [scrollbar-width:none]'>
            {list.map((n) => {
              const [title, ...rest] = n.content.split('\n');
              return (
                <li
                  key={n.id}
                  className='hover:bg-blue flex flex-col gap-[8px] px-4 px-20 py-3 py-16'
                >
                  <div className='flex items-center justify-between'>
                    <span className='txt-14_B'>{title}</span>
                    <span className='txt-12_M text-gray-400'>
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>
                  {rest.length > 0 && (
                    <p className='txt-14_body_M text-gray-800'>
                      {rest.join(' ')}
                    </p>
                  )}
                </li>
              );
            })}

            {list.length === 0 && (
              <p className='flex h-full w-full items-center justify-center text-gray-500'>
                새 알림이 없습니다.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
