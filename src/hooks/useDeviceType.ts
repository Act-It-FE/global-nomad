import { useEffect } from 'react';

import useMediaStore from '@/stores/useMediaStore';

export function useDeviceType() {
  const setDevice = useMediaStore((state) => state.setDevice);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDeviceType = () => {
      const width = window.innerWidth;

      if (width <= 425) {
        setDevice('mobile');
      } else if (width <= 744) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, [setDevice]);
}
