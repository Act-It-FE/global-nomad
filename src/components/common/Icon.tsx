import { lazy, Suspense, useMemo } from 'react';
import ICON_MAP from '@/constants/iconMap';

type IconProps = {
  icon: keyof typeof ICON_MAP;
  className?: string;
};

export default function Icon({ icon, className }: IconProps) {
  if (!icon || !ICON_MAP[icon]) {
    return null;
  }

  const IconComponent = useMemo(() => {
    const importFn = ICON_MAP[icon];
    if (!importFn) {
      return null;
    }
    return lazy(importFn);
  }, [icon]);

  if (!IconComponent) {
    return null;
  }

  return (
    <Suspense fallback={<span className={className} />}>
      <IconComponent className={className} />
    </Suspense>
  );
}
