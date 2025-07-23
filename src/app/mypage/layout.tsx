// layout.tsx (서버 컴포넌트)
import { ReactNode } from 'react';

import Gnb from '@/components/common/Gnb';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gnb
        user={{
          id: 1,
          nickname: 'string',
          profileImageUrl: '/images/logo-lg-text.png',
        }}
      />
      <ResponsiveLayout>{children}</ResponsiveLayout>
    </>
  );
}
