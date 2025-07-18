import './globals.css';

import localFont from 'next/font/local';

import Footer from '@/components/common/footer';

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
