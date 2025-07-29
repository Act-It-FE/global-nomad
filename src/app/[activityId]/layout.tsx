import { ReactNode } from 'react';

export default function ActivityDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className='flex justify-center pt-40'>
      <div className='flex w-full max-w-1200'>
        <main className='flex-1'>{children}</main>
      </div>
    </section>
  );
}
