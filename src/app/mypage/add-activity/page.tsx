import { cn } from '@/utils/cn';

export default function Page() {
  return (
    <main
      className={cn(
        'mx-auto max-w-760 px-24 py-30 md:px-30 md:py-40',
        'flex flex-col gap-24',
      )}
    />
  );
}
