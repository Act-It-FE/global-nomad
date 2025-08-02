import { ActivityRegisterSchedule } from '@/api/types/activities';
import Input from '@/components/Input';

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
    </div>
  );
}
