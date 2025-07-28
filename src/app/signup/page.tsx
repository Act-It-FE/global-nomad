'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Input from '@/components/Input';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const emailError =
    email.length > 0 && !isEmailValid ? '잘못된 이메일입니다.' : '';

  const isPasswordValid = password.length >= 8;
  const passwordError =
    password.length > 0 && !isPasswordValid ? '8자 이상 입력해 주세요.' : '';

  const isConfirmValid =
    confirmPassword.length > 0 && confirmPassword === password;
  const confirmError =
    confirmPassword.length > 0 && !isConfirmValid
      ? '비밀번호가 일치하지 않습니다.'
      : '';

  const isNicknameValid = nickname.trim() !== '';

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isConfirmValid;

  const handleSubmit = () => {
    console.log({ email, nickname, password });
    router.push('/');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-328 flex-col items-center md:w-640'>
        {/* 로고 */}
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

        {/* 폼 필드 & 버튼 & SNS & 하단 링크 */}
        <div className='flex flex-col items-center gap-24 md:gap-30'>
          {/* 입력 필드 */}
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
              <p className='txt-16_M text-gray-950'>닉네임</p>
              <Input
                className='h-54 w-full'
                id='nickname'
                placeholder='닉네임을 입력해 주세요'
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-10'>
              <p className='txt-16_M text-gray-950'>비밀번호</p>
              <Input
                className='h-54 w-full'
                errorMessage={passwordError}
                id='password'
                placeholder='8자 이상 입력해 주세요'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-10'>
              <p className='txt-16_M text-gray-950'>비밀번호 확인</p>
              <Input
                className='h-54 w-full'
                errorMessage={confirmError}
                id='confirmPassword'
                placeholder='비밀번호를 한 번 더 입력해 주세요'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {isFormValid ? (
            <Button
              className='txt-16_B mt-24 h-54 w-full md:mt-30'
              rounded='16'
              variant='primary'
              onClick={handleSubmit}
            >
              회원가입하기
            </Button>
          ) : (
            <Button
              disabled
              className='txt-16_B mt-24 h-54 w-full md:mt-30'
              rounded='16'
            >
              회원가입하기
            </Button>
          )}

          <div className='flex w-full items-center'>
            <div className='h-1 flex-grow bg-gray-100' />
            <span className='txt-16 text-gray-550 px-10'>
              SNS 계정으로 회원가입하기
            </span>
            <div className='h-1 flex-grow bg-gray-100' />
          </div>

          <Button
            icon={<Icon className='mr-2 size-24' icon='Kakao' />}
            size='xl'
            variant='kakao'
          >
            카카오 회원가입
          </Button>

          <div className='flex gap-2'>
            <p className='txt-16_M text-gray-400'>회원이신가요?</p>
            <Link className='txt-16_M text-gray-400 underline' href='/login'>
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
