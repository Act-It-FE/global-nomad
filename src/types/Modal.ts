export type ModalVariant = 'onlyText' | 'warning' | 'review';

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
  cancelText?: string;
  confirmText?: string;
}

export interface ReviewModalProps {
  variant: 'review';
  activityName: string;
  activitySchedule: string;
  defaultRating?: number;
  defaultComment?: string;
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

export type ModalProps =
  | OnlyTextModalProps
  | WarningModalProps
  | ReviewModalProps;
