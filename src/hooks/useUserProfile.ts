// src/hooks/useUserProfile.ts
import { useEffect, useState } from 'react';

import kakaoApi, { KakaoProfile } from '@/api/kakao';

export function useUserProfile() {
  const [profile, setProfile] = useState<KakaoProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await kakaoApi.getProfile();
        setProfile(data);
        console.log(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    }

    void fetchProfile();
  }, []);

  return { profile, loading, error };
}
