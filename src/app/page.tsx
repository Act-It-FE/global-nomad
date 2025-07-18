import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import ICON_MAP from '@/constants/iconMap';
export default function Home() {
  const iconKeys = Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[];
  return (
    <div className='grid grid-cols-5 gap-4'>
      {iconKeys.map((iconKey) => (
        <div key={iconKey} className='flex flex-col items-center'>
          <Icon className='text-primary-500 size-20' icon={iconKey} />
          <span className='mt-1 text-xs'>{iconKey}</span>
        </div>
      ))}
      <Button size='xl' variant='secondary'>
        회원가입
      </Button>
    </div>
  );
}
