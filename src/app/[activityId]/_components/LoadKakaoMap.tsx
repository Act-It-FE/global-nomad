'use client';

import { useEffect, useState } from 'react';

import RenderKakaoMap from './RenderKakaoMap';

interface LoadKakaoMapProps {
  address: string;
}

export default function LoadKakaoMap({ address }: LoadKakaoMapProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'kakao-map-sdk';

    if (typeof window === 'undefined') return;

    const onLoad = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setLoaded(true);
        });
      }
    };

    if (document.getElementById(scriptId)) {
      onLoad();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = onLoad;
    script.onerror = () => {
      console.error('❌ 카카오 지도 SDK 로딩 실패');
    };

    document.head.appendChild(script);
  }, []);

  return loaded ? (
    <RenderKakaoMap address={address} />
  ) : (
    <p>지도를 불러오는 중...</p>
  );
}
