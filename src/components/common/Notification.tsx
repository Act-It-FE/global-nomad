'use client';

import stringReplace from 'react-string-replace';

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

function NotificationPanel({ open, onClose, list }: NotificationPanelProps) {
  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };
  const highlight = (text: string) =>
    stringReplace(text, /(승인|거절)/g, (match, i) => (
      <strong
        key={i}
        className={
          match === '승인'
            ? 'text-primary-500 txt-14_M'
            : 'txt-14_M text-red-500'
        }
      >
        {match}
      </strong>
    ));

  if (!open) return null;

  return (
    <div className='absolute top-[27px] right-[-116px] z-50 flex h-[326px] w-[327px] flex-col rounded-[10px] bg-white shadow-lg sm:right-0 sm:w-[231px]'>
      <div className='flex items-center justify-between border-b border-gray-100 px-20 py-16'>
        <span className='txt-16_B'>알림 {list.length}개</span>
        <button onClick={onClose}>
          <Icon
            className='size-20 text-black hover:text-gray-600'
            icon='Delete'
          />
        </button>
      </div>

      <ul className='flex-1 overflow-y-auto [scrollbar-width:none]'>
        {list.map((n) => {
          const [title, activityName, schedule, ...restLines] =
            n.content.split('\n');
          return (
            <li
              key={n.id}
              className='hover:bg-primary-100 flex flex-col gap-8 px-20 py-16'
            >
              <div className='flex items-center justify-between'>
                <span className='txt-14_B'>{title}</span>
                <span className='txt-12_M text-gray-400'>
                  {timeAgo(n.createdAt)}
                </span>
              </div>
              <div>
                <p className='txt-14_body_M text-gray-800'>{activityName}</p>
                <p className='txt-14_body_M text-gray-800'>{schedule}</p>
                {restLines.length > 0 && (
                  <p className='txt-14_body_M text-gray-800'>
                    {highlight(restLines.join(' '))}
                  </p>
                )}
              </div>
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
}

export default NotificationPanel;
