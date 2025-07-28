'use client';

import { useEffect, useRef } from 'react';

interface RenderKakaoMapProps {
  address: string;
}

export default function RenderKakaoMap({ address }: RenderKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const map = new window.kakao.maps.Map(mapRef.current!, {
          center: coords,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: coords,
        });
      } else {
        console.error('❌ 주소 검색 실패:', status);
      }
    });
  }, [address]);

  return (
    <div ref={mapRef} className='h-[300px] w-full rounded-md bg-gray-100' />
  );
}
