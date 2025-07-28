'use client';

import { useEffect, useRef } from 'react';

interface RenderKakaoMapProps {
  address: string;
}

export default function RenderKakaoMap({ address }: RenderKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        console.error('❌ 주소 검색 실패:', status);
        return;
      }

      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      // 지도 생성 확대, 지도 스크롤 금지
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: coords,
        level: 3,
        draggable: false,
        scrollwheel: false,
        disableDoubleClick: true,
        disableDoubleClickZoom: true,
      });

      // 중심 좌표에 마커 생성
      const marker = new window.kakao.maps.Marker({
        map,
        position: map.getCenter(),
      });

      // 창 크기 변경 시 지도 중심 및 마커 재설정
      const handleResize = () => {
        map.setCenter(coords);
        marker.setPosition(coords);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  }, [address]);

  return (
    <div>
      <p className='txt-18_B my-7 leading-[21px] text-gray-950'>오시는 길</p>
      <p className='my-7 text-[14px] leading-[24px] font-semibold'>{address}</p>
      <div>
        <div ref={mapRef} className='h-450 w-full max-w-670 rounded-[24px]' />
      </div>
    </div>
  );
}
