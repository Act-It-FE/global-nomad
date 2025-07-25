import { fetcher } from '../api';

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignUpResponse {
  userId: number;
  email: string;
  nickname: string;
  createdAt: string;
}
export async function signUpUser(
  teamId: string,
  data: SignUpRequest,
): Promise<SignUpResponse> {
  const res = await fetcher.post(`/${teamId}/users`, data);
  return res.data;
}
