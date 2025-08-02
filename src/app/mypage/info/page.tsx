'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import userApi from '@/api/userApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUserStore } from '@/stores/userStore';

export default function Page() {
  const router = useRouter();

  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const isMobile = useMediaQuery('mobile');
  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  useEffect(() => {
    setPasswordError(password.length > 0 && password.length < 8);
    setPasswordCheckError(
      passwordCheck.length > 0 && password !== passwordCheck,
    );
  }, [password, passwordCheck]);

  useEffect(() => {
    setNicknameError(!nickname.trim());
  }, [nickname]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setModalMessage('닉네임을 입력해주세요.');
      setIsModalOpen(true);
      return;
    }

    if (password && password.length < 8) {
      setModalMessage('비밀번호는 8자 이상이어야 합니다.');
      setIsModalOpen(true);
      return;
    }

    if (password && password !== passwordCheck) {
      setModalMessage('비밀번호가 일치하지 않습니다.');
      setIsModalOpen(true);
      return;
    }

    try {
      const updated = await userApi.updateMyInfo({
        nickname,
        newPassword: password || undefined,
      });

      setUser(updated);
      setModalMessage('정보가 수정되었습니다!');
      setIsModalOpen(true);
    } catch (e) {
      setModalMessage(e.response?.data?.message || '정보 수정에 실패했습니다.');
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form
        className='flex w-full flex-col gap-20 pb-55 md:gap-24 md:pb-275'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-10 py-10'>
          <h1 className='txt-18_B leading-21 text-gray-950'>내 정보</h1>
          <p className='txt-14_M leading-17 text-gray-500'>
            닉네임과 비밀번호를 수정하실 수 있습니다.
          </p>
        </div>

        <div className='flex flex-col gap-18 md:gap-24'>
          <Input
            errorMessage={nicknameError ? '닉네임을 입력해주세요.' : ''}
            id='nickname'
            label='닉네임'
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            readOnly
            id='email'
            label='이메일'
            type='email'
            value={user?.email || ''}
          />
          <Input
            errorMessage={passwordError ? '8자 이상 작성해주세요.' : ''}
            id='password'
            label='비밀번호'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            errorMessage={
              passwordCheckError ? '비밀번호가 일치하지 않습니다.' : ''
            }
            id='passwordcheck'
            label='비밀번호 확인'
            type='password'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className='flex justify-center gap-12 pt-12 md:pt-0'>
          <Button
            className='max-w-none md:hidden'
            rounded='14'
            size='md'
            type='button'
            variant='secondary'
            onClick={() => router.push('/mypage')}
          >
            취소하기
          </Button>
          <Button
            className='max-w-none md:w-120'
            rounded={isMobile ? '14' : '12'}
            size={isMobile ? 'md' : 'sm'}
            type='submit'
          >
            저장하기
          </Button>
        </div>
      </form>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          variant='onlyText'
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
