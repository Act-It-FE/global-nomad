import EyeIcon from '@/assets/icons/eye_off.svg';
import { cn } from '@/utils/cn';

const COMMON_STYLE = cn(
  'size-80 md:size-126 lg:size-128',
  'rounded-lg md:rounded-2xl border border-gray-100',
);

export default function ImageUploader({ max }: { max: number }) {
  return (
    <div className='flex gap-12 md:gap-14'>
      <label
        className={cn(
          COMMON_STYLE,
          'flex flex-col items-center justify-center gap-2 md:gap-10',
        )}
      >
        <EyeIcon className='size-40 text-gray-400' />
        <div className='txt-13_M md:txt-14_M leading-[calc(1em+3px)] text-gray-600'>
          /{max > 0 ? max : 1}
        </div>
        <input hidden multiple={max > 1} type='file' />
      </label>
    </div>
  );
}
