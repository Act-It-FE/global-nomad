import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-50 text-center'>
      {/* '404' 시각적 표현 */}
      <div className='flex items-center justify-center'>
        <span className='text-8xl font-bold text-gray-400 md:text-9xl'>4</span>
        <Image
          alt='페이지 없음'
          className='mx-4 md:size-130'
          height={100}
          src='/images/empty-image.png'
          width={100}
        />
        <span className='text-8xl font-bold text-gray-400 md:text-9xl'>4</span>
      </div>

      <div className='flex flex-col items-center justify-center gap-10'>
        <h2 className='text-xl font-semibold lg:text-2xl'>
          죄송합니다. 페이지를 찾을 수 없습니다.
        </h2>
        <p className='text-base text-gray-600'>
          요청하신 페이지가 존재하지 않거나,
          <br className='md:hidden' />
          다른 위치로 이동했을 수 있습니다.
        </p>
        <Link
          className='txt-16_B bg-primary-500 flex w-200 items-center justify-center rounded-2xl px-40 py-13 tracking-[-0.4px] text-white'
          href='/'
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
