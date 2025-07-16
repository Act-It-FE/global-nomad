import Image from 'next/image';
import Button from '@/components/';

export const BasicWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className='h-140 w-320 rounded-[30px] bg-white md:h-170 md:w-400'>
    <p className='text-16_B md:text-18_B'>{children}</p>
  </div>
);

export const EditWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className='h-185 w-320 rounded-[30px] bg-white md:h-242 md:w-400'>
    <div className='relative h-49 w-49 md:h-88 md:w-88'>
      <Image src='@/public/images/warning.png' alt='수정 중 이탈' fill />
    </div>
    <p className='text-16_B md:text-18_B'>{children}</p>
    <Button
      variant='primary'
      size='xl'
      rounded='16'
      onClick={() => console.log('클릭 시 회원가입')}
    >
      회원가입하기
    </Button>
  </div>
);
