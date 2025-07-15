import axios from 'axios';

// 테스트용 하드코딩 토큰 (실제 발급 받은 토큰)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE1MCwidGVhbUlkIjoiMTUtNyIsImlhdCI6MTc1MjU4Mjk1MywiZXhwIjoxNzUyNTg0NzUzLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.igThB_DbA85iWmI_tYzigXkylA_77sKtO2Wlx3-PiUI';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
