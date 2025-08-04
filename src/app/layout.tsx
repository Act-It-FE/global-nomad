import './globals.css';

import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: '글로벌 노마드',
  description: '언제 어디서든 원하는 체험을 예약하세요',
  metadataBase: new URL('https://global-nomad-omega.vercel.app'),
  openGraph: {
    title: '글로벌 노마드',
    description: '언제 어디서든 원하는 체험을 예약하세요',
    images: ['/images/actit-logo.png'],
  },
};

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
        <script
          async
          src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
        />
      </body>
    </html>
  );
}
