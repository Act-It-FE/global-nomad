import { lazy, Suspense, useMemo } from 'react';
import ICON_MAP from '@/constants/iconMap';

type IconProps = {
  icon: keyof typeof ICON_MAP;
  className?: string;
};

export default function Icon({ icon, className }: IconProps) {
  const IconComponent = useMemo(() => lazy(ICON_MAP[icon]), [icon]);

  return (
    <Suspense fallback={<span className={className} />}>
      <IconComponent className={className} />
    </Suspense>
  );
}
