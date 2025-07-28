'use client';

import { useEffect, useRef, useState } from 'react';

interface RenderKakaoMapProps {
  address: string;
}

export default function RenderKakaoMap({ address }: RenderKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) {
      setError('지도 정보를 불러올 수 없습니다.');
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        console.error('주소 검색 실패:', status);
        setError('올바른 주소를 입력해주세요.');
        return;
      }

      try {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const map = new window.kakao.maps.Map(mapRef.current!, {
          center: coords,
          level: 3,
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
          disableDoubleClickZoom: true,
        });

        const marker = new window.kakao.maps.Marker({
          map,
          position: map.getCenter(),
        });

        const handleResize = () => {
          map.setCenter(coords);
          marker.setPosition(coords);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (e) {
        console.error('지도 로딩 중 에러:', e);
        setError('지도를 표시하는 중 문제가 발생했습니다.');
      }
    });
  }, [address]);

  return (
    <div className='flex- justify-center border-t border-b border-gray-200 py-40'>
      <p className='txt-18_B my-7 leading-[21px] text-gray-950'>오시는 길</p>
      <p className='txt-14_M my-7 leading-[24px] font-semibold opacity-75'>
        {address}
      </p>
      <div>
        {error ? (
          <p className='text-sm text-red-500'>{error}</p>
        ) : (
          <div ref={mapRef} className='h-450 w-full max-w-670 rounded-[24px]' />
        )}
      </div>
    </div>
  );
}
