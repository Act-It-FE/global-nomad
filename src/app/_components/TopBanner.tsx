import Image from 'next/image';

type TopBannerProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

export default function TopBanner({
  imageUrl,
  title,
  subtitle,
}: TopBannerProps) {
  return (
    <section className='relative w-full overflow-hidden rounded-[12px] shadow-[0_4px_24px_0_rgba(156,180,202,0.20)] md:rounded-[18px] lg:rounded-[24px]'>
      <div className='relative aspect-[327/181] md:aspect-[684/375] lg:aspect-[1120/500]'>
        <Image
          fill
          priority
          alt={title}
          className='object-cover'
          src={imageUrl}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-[rgba(0,0,0,0.5)]' />
      </div>

      <div className='absolute right-0 bottom-36 left-0 flex flex-col items-center justify-end gap-8 text-white md:bottom-76 md:gap-14 lg:bottom-101 lg:gap-19'>
        <h1 className='txt-18_B md:txt-24_B lg:txt-32_B'>{title}</h1>
        <p className='txt-14_M md:txt-16_B lg:txt-18_B'>{subtitle}</p>
      </div>
    </section>
  );
}
