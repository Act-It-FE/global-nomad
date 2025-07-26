import { ActivityBasic } from '@/types/MyActivities';
import { cn } from '@/utils/cn';

export default function MyExperience({ data }: { data: ActivityBasic }) {
  return (
    <article
      className={cn(
        'flex justify-between gap-22 lg:items-center',
        'rounded-3xl p-24 lg:p-30',
        'card-shadow bg-white',
      )}
    >
      <div />
      <img //Image로 변경 필요
        alt='banner image'
        className='size-82 rounded-[20px] object-cover lg:size-142 lg:rounded-[30px]'
        src={data.bannerImageUrl}
      />
    </article>
  );
}
