export type ConfirmModalProps = {
  isLoading?: boolean;
  title: string;
  onCloseModal: () => void;
  open: boolean;
  onConfirm: () => void;
  content?: string;
  firstBtnName?: string;
  secondBtnName?: string;
};
