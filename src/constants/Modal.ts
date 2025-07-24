import { OnlyTextContent } from '@/components/common/Modal/contents/OnlyTextContent';
import { ReviewContent } from '@/components/common/Modal/contents/ReviewContent';
import { WarningContent } from '@/components/common/Modal/contents/WarningContent';
import type { ModalProps, ModalVariant } from '@/types/components-types/Modal';

type ContentMapType = {
  [V in ModalVariant]: React.FC<Extract<ModalProps, { variant: V }>>;
};

export const ContentMap: ContentMapType = {
  onlyText: OnlyTextContent,
  warning: WarningContent,
  review: ReviewContent,
} as const;
