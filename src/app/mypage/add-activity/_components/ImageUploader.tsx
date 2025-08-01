import EyeIcon from '@/assets/icons/eye_off.svg';

export default function ImageUploader() {
  return (
    <div className='flex gap-12 md:gap-14'>
      <label className='flex flex-col gap-2 md:gap-10'>
        <EyeIcon className='size-40 text-gray-400' />
        <input hidden type='file' />
      </label>
    </div>
  );
}
