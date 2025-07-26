import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Search() {
  const isMobile = useMediaQuery('mobile');

  return (
    <div className='flex flex-col items-center gap-12 py-16 md:gap-36 md:px-40 md:py-32'>
      <h1 className='txt-16_B md:txt-32_B'>무엇을 체험하고 싶으신가요?</h1>
      <div className='flex w-full items-center justify-center gap-8 rounded-[16px] bg-white py-6 pr-8 pl-20 shadow-[0_6px_10px_0_rgba(13,153,255,0.05)] md:justify-between md:rounded-[24px] md:py-10 md:pr-12 md:pl-32'>
        <div className='flex flex-1 gap-4 md:gap-10'>
          <Icon className='size-24 text-gray-950' icon='Search' />
          <input
            className='flex-1'
            placeholder='내가 원하는 체험은'
            type='text'
          />
        </div>
        <Button rounded={isMobile ? '12' : '14'} size={isMobile ? 'sm' : 'md'}>
          검색하기
        </Button>
      </div>
    </div>
  );
}
