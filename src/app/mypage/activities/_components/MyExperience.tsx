import Icon from '@/components/Icon';
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
      <div className='text-gray-950'>
        <div className='txt-16_B lg:txt-18_B leading-[calc(1em+3px)]'>
          {data.title}
        </div>
        <div className='mt-6 flex items-center gap-2 lg:mt-8'>
          <Icon className='text-yellow size-14 lg:size-16' icon='Star' />
          <div className='txt-13_M lg:txt-16_M leading-[calc(1em+3px)] text-gray-500'>
            {data.rating} ({data.reviewCount})
          </div>
        </div>
        <div className='mt-10 flex items-center gap-4 lg:mt-12'>
          <div className='txt-16_B lg:txt-18_B leading-[calc(1em+3px)]'>
            ￦{data.price.toLocaleString('ko-KR')}
          </div>
          <div className='txt-14_M lg:txt-16_M leading-[calc(1em+3px)] text-gray-400'>
            / 인
          </div>
        </div>
      </div>
      <img //Image로 변경 필요
        alt='banner image'
        className='size-82 rounded-[20px] object-cover lg:size-142 lg:rounded-[30px]'
        src={data.bannerImageUrl}
      />
    </article>
  );
}
