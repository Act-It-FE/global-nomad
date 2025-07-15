import api from './textAxios'; // axios 인스턴스

export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/users/me/image', formData);

  return response.data.profileImageUrl;
}
