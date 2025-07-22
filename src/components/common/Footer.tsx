import Link from 'next/link';

import Icon from '@/components/common/Icon';

export default function Footer() {
  return (
    <footer className='bottom-0 grid h-116 w-full grid-cols-2 items-center border-t border-gray-100 bg-white py-10 md:flex md:justify-between md:px-40 lg:px-200'>
      <Link
        href='https://github.com/Act-It-FE/global-nomad'
        className='col-start-1 row-start-2 justify-self-center text-gray-400 md:col-auto md:row-auto'
      >
        @act-it-2025
      </Link>
      <div className='col-span-2 row-start-1 flex justify-center gap-24 md:col-auto md:row-auto'>
        <p className='text-gray-600'>Privacy Policy</p>
        <p className='text-gray-600'>·</p>
        <p className='text-gray-600'>FAQ</p>
      </div>
      <div className='col-start-2 row-start-2 flex justify-center gap-16 justify-self-center md:col-auto md:row-auto'>
        <Link href='https://www.facebook.com/'>
          <Icon className='size-20 text-gray-400' icon='Facebook' />
        </Link>
        <Link href='https://www.instagram.com/'>
          <Icon className='size-20 text-gray-400' icon='Instagram' />
        </Link>
        <Link href='https://www.youtube.com/'>
          <Icon className='size-20 text-gray-400' icon='Youtube' />
        </Link>
        <Link href='https://x.com/'>
          <Icon className='size-20 text-gray-400' icon='X' />
        </Link>
      </div>
    </footer>
  );
}
