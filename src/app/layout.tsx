import './globals.css';
import Footer from '@/components/common/footer';

import localFont from 'next/font/local';

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
    <html lang='ko' className={pretendard.variable}>
      <body className={pretendard.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
