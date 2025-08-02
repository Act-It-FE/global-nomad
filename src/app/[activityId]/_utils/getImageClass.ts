export const getImageContainerClass = (isSingle: boolean) => {
  const base = 'overflow-hidden';
  return isSingle ? `${base} w-1/2 h-372` : `${base} flex-1 aspect-[6/3]`;
};

export const getImageColumnWrapperClass = (isSingle: boolean) => {
  return isSingle ? 'w-1/2 h-372' : 'flex-1';
};

export const getSubImageClass = ({
  isSingle,
  isFirst,
  isLast,
}: {
  isSingle: boolean;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const base = 'h-full w-full object-cover';
  if (isSingle) return `${base} rounded-tr-[24px] rounded-br-[24px]`;
  if (isFirst) return `${base} rounded-tr-[24px]`;
  if (isLast) return `${base} rounded-br-[24px]`;
  return base;
};
