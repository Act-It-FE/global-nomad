'use client';

import stringReplace from 'react-string-replace';

import { MyNotification } from '@/api/types/notifications';
import Icon from '@/components/Icon';
import { useMyNotifyDelete } from '@/hooks/myNotifications/useMyNotifyMutate';
import { parseNotificationContent } from '@/utils/parseNotificationContent';

import useInfiniteScroll from '../hooks/useInfiniteScroll';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

// API 타입과 기존 타입 모두 허용
type NotificationItem = Notification | MyNotification;

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  list: Notification[];
  totalCount?: number;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export default function NotificationPanel({
  open,
  onClose,
  list,
  totalCount,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
}: NotificationPanelProps) {
  const { mutate: deleteNotification } = useMyNotifyDelete();

  const lastElementRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: fetchNextPage || (() => {}),
  });

  // li 요소용 ref wrapper
  const lastElement = (node: HTMLLIElement | null) => {
    if (node) {
      lastElementRef(node as unknown as HTMLDivElement);
    }
  };

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

  const handleCancelReservation = (notify: Notification) => {
    deleteNotification(notify.id);
  };

  if (!open) return null;

  return (
    <div className='absolute top-27 -right-116 z-50 flex h-326 w-327 flex-col rounded-[10px] bg-white shadow-lg md:right-0 md:w-231'>
      <div className='flex items-center justify-between border-b border-gray-100 px-20 py-16'>
        <span className='txt-16_B'>알림 {totalCount}개</span>
        <button onClick={onClose}>
          <Icon
            className='size-20 text-black hover:text-gray-600'
            icon='Delete'
          />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto [scrollbar-width:none]'>
        {list.map((notify, index) => {
          const { activityName, schedule, statusText } =
            parseNotificationContent(notify.content);

          // 상태에 따라 제목 동적 생성
          const getTitle = (status: string) => {
            if (status.includes('승인')) return '예약 승인';
            if (status.includes('거절')) return '예약 거절';
            return '알림';
          };

          const isLastItem = index === list.length - 1;

          return (
            <button
              key={notify.id}
              ref={
                isLastItem
                  ? (lastElement as unknown as React.Ref<HTMLButtonElement>)
                  : undefined
              }
              className='hover:bg-primary-100 flex w-full cursor-pointer flex-col gap-8 border-0 bg-transparent px-20 py-16 text-left'
              onClick={() => handleCancelReservation(notify)}
            >
              <div className='flex items-center justify-between'>
                <span className='txt-14_B'>{getTitle(statusText)}</span>
                <span className='txt-12_M text-gray-400'>
                  {timeAgo(notify.createdAt)}
                </span>
              </div>
              <div>
                <p className='txt-14_body_M truncate text-gray-800'>
                  {activityName}
                </p>
                <p className='txt-14_body_M text-gray-800'>{schedule}</p>
                <p className='txt-14_body_M text-gray-800'>
                  {highlight(statusText)}
                </p>
              </div>
            </button>
          );
        })}

        {/* 로딩 표시 */}
        {isFetchingNextPage && (
          <div className='flex items-center justify-center py-16'>
            <div className='border-primary-500 size-20 animate-spin rounded-full border-2 border-t-transparent' />
          </div>
        )}

        {list.length === 0 && (
          <p className='flex h-full w-full items-center justify-center text-gray-500'>
            새 알림이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
