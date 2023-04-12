import { ReactNode } from "react";

export type FormModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};
