import api from './textAxios'; // axios 인스턴스

export async function uploadProfileImage(file: File): Promise<string> {
  // 파일 유효성 검사
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('유효한 이미지 파일이 아닙니다');
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('파일 크기가 5MB를 초과합니다');
  }
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await api.post('/users/me/image', formData);
    return response.data.profileImageUrl;
  } catch (error) {
    console.error('프로필 이미지 업로드 실패:', error);
    throw new Error('프로필 이미지 업로드에 실패했습니다');
  }
}
