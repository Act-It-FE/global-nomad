'use client';
import ReactDOM from 'react-dom';

import { ContentMap } from '@/constants/Modals';
import type { ModalProps } from '@/types/Modals';

export default function Modal<P extends ModalProps>(props: P) {
  const Content = ContentMap[props.variant] as React.FC<P>;

  if (!Content) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='relative max-w-md rounded-2xl bg-white p-6'>
        <Content {...props} />
      </div>
    </div>,
    document.body,
  );
}
