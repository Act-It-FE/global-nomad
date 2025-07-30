import Icon from '@/components/Icon';

export default function ActivitySummary() {
  return (
    <section className='flex flex-col gap-6'>
      <div className='txt-14_M leading-17 text-gray-950 opacity-75'>
        카테고리
      </div>
      <p className='txt-24_B leading-29 text-gray-950'>타이틀</p>
      <div className='txt-14_M leading-17 text-gray-700'>
        <div className='mt-4 flex flex-row items-center gap-4'>
          <Icon className='fill-yellow-400' icon='Star' />
          <span className='my-5'>평균평점</span>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Icon className='fill-black' icon='Map' />
          <p>주소</p>
        </div>
      </div>
    </section>
  );
}
