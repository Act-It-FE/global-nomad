'use client';

import { useState } from 'react';

import NotificationPanel, {
  Notification,
} from '@/components/common/Notification';
import Pagination from '@/components/common/Pagination';
export default function Home() {
  const [page, setPage] = useState(1);
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
    <div className='flex h-500 items-center justify-center bg-gray-300'>
      <Pagination
        currentPage={page}
        pageSize={10}
        totalCount={215}
        onPageChange={setPage}
      />
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
  );
}
