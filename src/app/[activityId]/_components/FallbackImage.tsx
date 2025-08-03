type FallbackImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string; // 커스텀 fallback 이미지도 허용
};

export default function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/logo-lg.png',
}: FallbackImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== fallbackSrc) {
      target.src = fallbackSrc;
    }
  };

  return (
    <img
      alt={alt}
      className={className}
      draggable={false}
      src={src || fallbackSrc}
      onError={handleError}
    />
  );
}
