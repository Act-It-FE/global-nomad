import {
  InputContent,
  OnlyTextContent,
  WarningContent,
} from '@/components/common/Modals/contents';
import type { ModalProps,ModalVariant } from '@/types/Modals';

type ContentMapType = {
  [V in ModalVariant]: React.FC<Extract<ModalProps, { variant: V }>>;
};

export const ContentMap: ContentMapType = {
  onlyText: OnlyTextContent,
  warning: WarningContent,
  input: InputContent,
} as const;
