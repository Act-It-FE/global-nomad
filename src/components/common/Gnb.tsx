import Image from 'next/image';

export default function Gnb() {
  return (
    <nav className='mx-auto flex h-48 max-w-1580 items-center justify-between px-24 md:h-80 md:px-30'>
      <Image
        alt='logo'
        className='max-md:hidden'
        height={28}
        src='/images/logo-sm-text.png'
        width={174}
      />
      <Image
        alt='logo'
        className='md:hidden'
        height={28}
        src='/images/logo-sm.png'
        width={28}
      />
    </nav>
  );
}
