export type RegisterFormDataType = {
  name: string;
  email: string;
  password: string;
};

export type RegisterSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onRedirect: () => void;
};
