import { ReactNode } from 'react';

export default function ActivityDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className='flex justify-center pt-40'>
      <div className='flex w-full max-w-1200 gap-40'>
        <main className='flex-1'>{children}</main>
        <aside className='w-410' />
      </div>
    </section>
  );
}
