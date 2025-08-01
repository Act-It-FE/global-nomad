import React, { Suspense } from 'react';

import KakaoCallbackPage from './kakaocallback';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
