import Input from '@/components/Input';

export default function DateInput() {
  return (
    <div className='flex flex-col gap-10 md:flex-row md:gap-14'>
      <div>
        <label
          className='txt-16_M mb-10 text-gray-950 max-md:hidden'
          htmlFor='date'
        >
          날짜
        </label>
        <Input id='date' type='date-custom' />
      </div>
    </div>
  );
}
