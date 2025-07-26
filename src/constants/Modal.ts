import { OnlyTextContent } from '@/components/Modal/contents/OnlyTextContent';
import { ReviewContent } from '@/components/Modal/contents/ReviewContent';
import { WarningContent } from '@/components/Modal/contents/WarningContent';
import type { ModalProps, ModalVariant } from '@/types/Modal';

type ContentMapType = {
  [V in ModalVariant]: React.FC<Extract<ModalProps, { variant: V }>>;
};

export const ContentMap: ContentMapType = {
  onlyText: OnlyTextContent,
  warning: WarningContent,
  review: ReviewContent,
} as const;
