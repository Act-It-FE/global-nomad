import { ActivityRegisterSchedule } from '@/api/types/activities';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { cn } from '@/utils/cn';

interface Props {
  defaultValue?: ActivityRegisterSchedule;
  onClick: (param: ActivityRegisterSchedule) => void;
}

export default function DateInput({ defaultValue }: Props) {
  return (
    <div className='flex flex-col gap-10 md:flex-row md:gap-14'>
      {defaultValue ? (
        <Input
          id='date'
          type='button'
          value={defaultValue.date.replaceAll('-', '/').slice(2)}
        />
      ) : (
        <div>
          <label
            className='txt-16_M mb-10 text-gray-950 max-md:hidden'
            htmlFor='date'
          >
            날짜
          </label>
          <Input id='date' type='date-custom' />
        </div>
      )}
      <div className='flex gap-14'>
        <button
          className={cn(
            'size-28 justify-items-center rounded-full md:size-42',
            defaultValue
              ? 'bg-gray-50 text-black'
              : 'bg-primary-500 text-white',
          )}
          type='button'
        >
          <Icon
            className='size-16 md:size-24'
            icon={defaultValue ? 'Minus' : 'Plus'}
          />
        </button>
      </div>
    </div>
  );
}
