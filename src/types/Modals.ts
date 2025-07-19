export type ModalVariant = 'onlyText' | 'warning' | 'input';

export interface OnlyTextModalProps {
  variant: 'onlyText';
  message: string;
  onClose: () => void;
}

export interface WarningModalProps {
  variant: 'warning';
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ReviewModalProps {
  variant: 'input';
  activityName: string;
  activitySchedule: string;
  defaultRating: number;
  defaultComment: string;
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

export type ModalProps =
  | OnlyTextModalProps
  | WarningModalProps
  | ReviewModalProps;
