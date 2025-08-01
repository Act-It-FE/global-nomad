import React, { Suspense } from 'react';

import KakaoCallbackPage from './kakaocallbackpage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
