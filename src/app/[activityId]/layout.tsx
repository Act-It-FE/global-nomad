import { ReactNode } from 'react';

export default function ActivityDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className='mx-auto max-w-1200 pt-40'>
      <main className='w-full'>{children}</main>
    </section>
  );
}
