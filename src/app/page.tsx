import Icon from '@/components/common/Icon';
import ICON_MAP from '@/constants/iconMap';
import { cn } from '@/utils/cn';

export default function Home() {
  const iconKeys = Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[];
  return (
    <div className={cn('grid grid-cols-5', 'gap-4')}>
      {iconKeys.map((iconKey) => (
        <div key={iconKey} className='flex flex-col items-center'>
          <Icon className='text-primary-500 size-20' icon={iconKey} />
          <span className='mt-1 text-xs'>{iconKey}</span>
        </div>
      ))}
    </div>
  );
}
