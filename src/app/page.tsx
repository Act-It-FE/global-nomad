import Button from '@/components/button/Button';

export default function Home() {
  return (
    <div className='m-4 flex flex-col gap-4'>
      <Button
        variant='primary'
        className='text-16_B h-[54px] max-w-[640px]'
        rounded='16'
      >
        회원가입하기
      </Button>
      <Button
        variant='secondary'
        className='text-14_M h-[47px] w-[113px]'
        rounded='12'
      >
        아니오
      </Button>
      <Button
        variant='disable'
        className='text-16_B h-[50px] max-w-[327px]'
        rounded='14'
      >
        예약하기
      </Button>
      <Button
        variant='editButton'
        className='text-14_M h-[29px] w-[68px]'
        rounded='8'
      >
        수정하기
      </Button>
      <Button
        variant='deleteButton'
        className='text-14_M h-[29px] w-[68px]'
        rounded='8'
      >
        예약취소
      </Button>
    </div>
  );
}
