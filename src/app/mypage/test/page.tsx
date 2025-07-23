'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal/Modal';
import Pagination from '@/components/common/Pagination';
import { ModalVariant } from '@/types/Modal';

export default function Page() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [modal, setModal] = useState<ModalVariant | null>(null);
  const router = useRouter();

  return (
    <div className='flex w-full flex-col gap-40 p-40'>
      <h2 className='txt-20_B'>Button</h2>
      <article className='flex flex-col gap-5'>
        <Button size='xl'>primary xl</Button>
        <Button disabled size='xl'>
          primary xl
        </Button>
        <Button size='lg'>primary lg</Button>
        <Button disabled size='lg'>
          primary lg
        </Button>
        <Button size='md'>primary md</Button>
        <Button disabled size='md'>
          primary md
        </Button>
        <Button size='sm'>primary sm</Button>
        <Button disabled size='sm'>
          primary sm
        </Button>
        <Button size='xs'>primary xs</Button>
        <Button disabled size='xs'>
          primary xs
        </Button>
        <Button size='xl' variant='secondary'>
          secondary xl
        </Button>
        <Button disabled size='xl' variant='secondary'>
          secondary xl
        </Button>
        <Button size='lg' variant='secondary'>
          secondary lg
        </Button>
        <Button disabled size='lg' variant='secondary'>
          secondary lg
        </Button>
        <Button size='md' variant='secondary'>
          secondary md
        </Button>
        <Button disabled size='md' variant='secondary'>
          secondary md
        </Button>
        <Button size='sm' variant='secondary'>
          secondary sm
        </Button>
        <Button disabled size='sm' variant='secondary'>
          secondary sm
        </Button>
        <Button size='xs' variant='secondary'>
          secondary xs
        </Button>
        <Button disabled size='xs' variant='secondary'>
          secondary xs
        </Button>
      </article>
      <h2 className='txt-20_B'>Dropdown</h2>
      <article className='flex gap-10'>
        <DropDown
          items={[
            {
              text: '마이페이지',
              onClick: () => router.push('/mypage'),
            },
            {
              text: '로그아웃',
              danger: true,
              onClick: () => alert('로그아웃 되었습니다.'),
            },
          ]}
          position='bottom'
          trigger={<Icon className='h-28 w-28' icon='More' />}
        />
        <DropDown
          items={[
            {
              text: '마이페이지',
              onClick: () => router.push('/mypage'),
            },
            {
              text: '로그아웃',
              danger: true,
              onClick: () => alert('로그아웃 되었습니다.'),
            },
          ]}
          position='left'
          trigger={<Icon className='h-28 w-28' icon='More' />}
        />
      </article>
      <h2 className='txt-20_B'>Input</h2>
      <article className='flex flex-col gap-20'>
        <Input id='text1' label='text' placeholder='placeholder' />
        <Input errorMessage='error' id='text2' />
        <Input
          id='password1'
          label='password'
          placeholder='placeholder'
          type='password'
        />
        <Input errorMessage='error' id='password2' type='password' />
        <Input
          height='120px'
          id='textarea1'
          label='textarea'
          placeholder='placeholder'
          type='textarea'
        />
        <Input
          errorMessage='error'
          height='120px'
          id='textarea2'
          type='textarea'
        />
        <Input
          id='dropdown'
          items={['one', 'two']}
          label='dropdown'
          placeholder='placeholder'
          type='dropdown'
        />
      </article>
      <h2 className='txt-20_B'>Pagination</h2>
      <article className='flex flex-col items-center'>
        <Pagination
          currentPage={page1}
          pageSize={5}
          totalCount={320}
          onPageChange={(p) => setPage1(p)}
        />
        <Pagination
          currentPage={page2}
          pageSize={5}
          totalCount={15}
          onPageChange={(p) => setPage2(p)}
        />
      </article>
      <h2 className='txt-20_B'>Modal</h2>
      <article className='flex gap-10'>
        <Button size='xl' onClick={() => setModal('onlyText')}>
          onlyText
        </Button>
        <Button size='xl' onClick={() => setModal('warning')}>
          warning
        </Button>
        <Button size='xl' onClick={() => setModal('review')}>
          review
        </Button>
        {(() => {
          switch (modal) {
            case 'onlyText':
              return (
                <Modal
                  message='확인 모달입니다.'
                  variant={modal}
                  onClose={() => setModal(null)}
                />
              );
            case 'warning':
              return (
                <Modal
                  message='취소 모달입니다.'
                  variant={modal}
                  onCancel={() => {
                    alert('취소했습니다.');
                    setModal(null);
                  }}
                  onConfirm={() => setModal(null)}
                />
              );
            case 'review':
              return (
                <Modal
                  activityName='체험'
                  activitySchedule='0000.00.00 / 99:99 - 99:99 (0명)'
                  variant={modal}
                  onClose={() => setModal(null)}
                  onSubmit={() => {
                    alert('리뷰가 작성되었습니다.');
                    setModal(null);
                  }}
                />
              );
            default:
              return null;
          }
        })()}
      </article>
    </div>
  );
}
