'use client';

import { useEffect, useState } from 'react';

type Device = 'pc' | 'tablet' | 'mobile';

const queryMap: Record<Device, string> = {
  pc: '(min-width: 1024px)',
  tablet: '(min-width: 744px) and (max-width: 1023px)',
  mobile: '(max-width: 743px)',
};

export function useMediaQuery(device: Device): boolean {
  const query = queryMap[device];
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
