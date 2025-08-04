import './globals.css';

import localFont from 'next/font/local';

import QueryProvider from '@/app/provider/QueryProvider';
import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={pretendard.variable} lang='ko'>
      <body className={`${pretendard.className} flex min-h-screen flex-col`}>
        <QueryProvider>
          <Gnb />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
      <script
        async
        src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      />
    </html>
  );
}
