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
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
          disableDoubleClickZoom: true,
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
    <div>
      <p className='txt-18_B text-gray-950'>오시는 길</p>
      <p className='text-[14px] font-semibold'>주소</p>
      <div>
        <div ref={mapRef} className='h-450 w-full max-w-670 rounded-[24px]' />
      </div>
    </div>
  );
}
