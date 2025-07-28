'use client';
import { useEffect, useState } from 'react';

import Icon from '@/components/Icon';
import { cn } from '@/utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // 애니메이션 완료 후 제거
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles =
      'fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-12 px-20 py-16 rounded-16 shadow-lg backdrop-blur-sm transition-all duration-300 max-w-sm';

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border border-red-200 text-red-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border border-blue-200 text-blue-800`;
      default:
        return `${baseStyles} bg-green-50 border border-green-200 text-green-800`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'Star';
      case 'error':
        return 'Warning';
      case 'info':
        return 'Setting';
      default:
        return 'Star';
    }
  };

  return (
    <div
      className={`${getToastStyles()} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
    >
      <Icon
        className={cn(`size-20`, {
          'text-green-600': type === 'success',
          'text-red-600': type === 'error',
          'text-blue-600': type === 'info',
        })}
        icon={getIcon()}
      />
      <span className='txt-14_M flex-1'>{message}</span>
      <button
        className='text-gray-400 transition-colors hover:text-gray-600'
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <Icon className='size-16' icon='X' />
      </button>
    </div>
  );
}
