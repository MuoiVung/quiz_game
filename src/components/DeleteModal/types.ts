export type DeleteModalProps = {
  isLoading: boolean;
  title: string;
  onCloseModal: () => void;
  open: boolean;
  onConfirmDelete: () => void;
};
