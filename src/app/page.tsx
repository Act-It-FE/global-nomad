import Button from '@/components/common/Button';

export default function Home() {
  return (
    <div>
      <Button disabled={false} size='xl' variant='primary'>
        회원가입
      </Button>
      <Button disabled size='xl' variant='primary'>
        회원가입
      </Button>
    </div>
  );
}
