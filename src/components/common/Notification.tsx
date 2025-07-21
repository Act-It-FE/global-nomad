'use client';
import { useRef } from 'react';

import Icon from '@/components/common/Icon';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  list: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  open,
  onClose,
  list,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const totalCount = list.length;

  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className='absolute flex h-326 w-327 flex-col rounded-[10px] bg-white shadow-lg sm:w-231'
    >
      <div className='flex items-center justify-between border-b-[1px] border-gray-100 px-20 py-16'>
        <span className='txt-16_B'>알림 {totalCount}개</span>
        <button className='hover:text-gray-600' onClick={onClose}>
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
                <p className='txt-14_body_M text-gray-800'>{rest.join(' ')}</p>
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
  );
};

export default NotificationPanel;
