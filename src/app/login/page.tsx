'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import authApi from '@/api/authApi';
import KakaoIcon from '@/assets/icons/kakao.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useUserStore } from '@/stores/userStore';
import { getRedirectUrl } from '@/utils/oauth/getRedirectUrl';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const emailError =
    email.length > 0 && !isEmailValid ? '이메일 형식으로 작성해 주세요.' : '';

  const isPasswordValid = password.length >= 8;
  const passwordError =
    password.length > 0 && !isPasswordValid ? '8자 이상 입력해 주세요.' : '';

  const isFormValid = isEmailValid && isPasswordValid;
  const redirectUrl = getRedirectUrl('login');

  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();

  async function handleLogin() {
    const { user, accessToken, refreshToken } = await authApi.login({
      email,
      password,
    });
    setUser(user);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    router.replace('/');
  }

  return (
    <div className='flex h-full min-h-screen w-full flex-col items-center justify-center'>
      <div className='flex w-328 flex-col items-center md:w-640'>
        <div className='relative mb-42 h-144 w-144 md:mb-62 md:h-199 md:w-255'>
          <Image
            fill
            alt='로고+텍스트'
            className='hidden object-contain md:block'
            src='/images/logo-lg-text.png'
          />
          <Image
            fill
            alt='로고'
            className='block object-contain md:hidden'
            src='/images/logo-lg.png'
          />
        </div>

        <div className='flex flex-col items-center gap-24 md:gap-30'>
          <div>
            <div className='flex w-328 flex-col gap-16 md:w-640 md:gap-20'>
              <div className='flex flex-col gap-10'>
                <p className='txt-16_M text-gray-950'>이메일</p>
                <Input
                  className='h-54 w-full'
                  errorMessage={emailError}
                  id='email'
                  placeholder='이메일을 입력해 주세요'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-10'>
                <p className='txt-16_M text-gray-950'>비밀번호</p>
                <Input
                  className='h-54 w-full'
                  errorMessage={passwordError}
                  id='password1'
                  placeholder='비밀번호를 입력해 주세요'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              className='txt-16_B mt-24 h-54 w-full md:mt-30'
              disabled={!isFormValid}
              rounded='16'
              variant={isFormValid ? 'primary' : undefined}
              onClick={handleLogin}
            >
              로그인하기
            </Button>
          </div>
          <div className='flex w-full items-center'>
            <hr className='h-1 flex-grow text-gray-100' />
            <span className='txt-16 px-10 text-[#79747e]'>or</span>
            <hr className='h-1 flex-grow text-gray-100' />
          </div>
          <Button
            icon={<KakaoIcon className='mr-2 h-24 w-24' />}
            size='xl'
            variant='kakao'
            onClick={() => {
              window.location.href = redirectUrl;
            }}
          >
            카카오 로그인
          </Button>
          <div className='flex'>
            <p className='txt-16_M text-gray-400'>회원이 아니신가요?</p>
            <Link className='txt-16_M text-gray-400 underline' href='/signup'>
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
