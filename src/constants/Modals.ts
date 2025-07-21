import { OnlyTextContent } from '@/components/common/Modals/contents/OnlyTextContent';
import { ReviewContent } from '@/components/common/Modals/contents/ReviewContent';
import { WarningContent } from '@/components/common/Modals/contents/WarningContent';
import type { ModalProps, ModalVariant } from '@/types/Modals';

type ContentMapType = {
  [V in ModalVariant]: React.FC<Extract<ModalProps, { variant: V }>>;
};

export const ContentMap: ContentMapType = {
  onlyText: OnlyTextContent,
  warning: WarningContent,
  review: ReviewContent,
} as const;
