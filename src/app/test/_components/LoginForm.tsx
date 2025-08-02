'use client';
import { useState } from 'react';

import authApi from '@/api/authApi';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      console.warn('로그인 성공:', res);
      // 토큰을 localStorage에 저장
      if (res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
        console.warn('토큰이 저장되었습니다.');
      }
      // TODO: 토큰 저장 및 리다이렉트 등 추가
    } catch (err: unknown) {
      console.warn('로그인 에러:', err);
      console.warn('에러 상세 정보:', JSON.stringify(err, null, 2));
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as {
          response?: { data?: { message?: string }; status?: number };
          message?: string;
        };
        if (axiosError.response?.data?.message) {
          setError(`로그인 실패: ${axiosError.response.data.message}`);
        } else if (axiosError.response?.data) {
          setError(`로그인 실패: ${JSON.stringify(axiosError.response.data)}`);
        } else if (axiosError.message) {
          setError(`로그인 실패: ${axiosError.message}`);
        } else {
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2 className='txt-20_B mb-20'>로그인</h2>
      <form className='flex flex-col gap-16' onSubmit={handleLogin}>
        <Input
          required
          id='login-email'
          label='이메일'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          id='login-password'
          label='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className='txt-14_M text-red-500'>{error}</div>}
        <Button disabled={loading} type='submit'>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
}
