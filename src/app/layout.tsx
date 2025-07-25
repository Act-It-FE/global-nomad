import './globals.css';

import localFont from 'next/font/local';

import QueryProvider from '@/app/provider/QueryProvider';
import Footer from '@/components/common/Footer';

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
      <body className={pretendard.className}>
        <QueryProvider>
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
