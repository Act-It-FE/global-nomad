import kakaoApi, { KakaoProfile } from '../api/kakao';

export async function fetchKakaoProfile(): Promise<KakaoProfile> {
  return kakaoApi.getProfile();
}
