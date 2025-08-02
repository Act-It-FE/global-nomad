import { cn } from '@/utils/cn';

export default function Page() {
  return (
    <form
      className={cn(
        'mx-auto max-w-760 px-24 py-30 md:px-30 md:py-40',
        'flex flex-col gap-24',
      )}
    >
      <h1 className='txt-18_B h-41 content-center'>내 체험 등록</h1>
    </form>
  );
}
