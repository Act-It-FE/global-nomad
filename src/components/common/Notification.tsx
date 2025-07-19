// components/NotificationPanel.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

// 알림 타입 정의
interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

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
  // 필요하다면 더 추가…
];

export default function NotificationPanel() {
  const [list] = useState<Notification[]>(mockNotifications);
  const totalCount = list.length;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 패널 닫기
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  // ISO → “n분 전” 변환
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
          className='/* 너비 20rem(320px) */ /* 높이 20rem(320px) */ absolute right-0 mt-2 flex h-80 w-80 flex-col rounded-lg border bg-white shadow-lg'
        >
          {/* 헤더 */}
          <div className='flex flex-none items-center justify-between border-b px-4 py-2'>
            <span className='font-medium'>알림 {totalCount}개</span>
            <button
              onClick={() => setOpen(false)}
              className='text-xl hover:text-gray-600'
            >
              ×
            </button>
          </div>

          <ul className='flex-1 divide-y overflow-y-auto'>
            {list.map((n) => {
              const [title, ...rest] = n.content.split('\n');
              return (
                <li key={n.id} className='px-4 py-3'>
                  <div className='flex justify-between'>
                    <span className='font-semibold text-gray-800'>{title}</span>
                    <span className='text-sm text-gray-400'>
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>
                  {rest.length > 0 && (
                    <p className='mt-1 text-sm text-gray-600'>
                      {rest.join(' ')}
                    </p>
                  )}
                </li>
              );
            })}

            {list.length === 0 && (
              <li className='p-4 text-center text-gray-500'>
                새 알림이 없습니다.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
