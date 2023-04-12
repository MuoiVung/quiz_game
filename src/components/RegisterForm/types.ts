import { ReactNode } from "react";
import { UserRoleType } from "../../api/UsersAPI/types";

export type RegisterFormDataType = {
  email: string;
  name: string;
  password: string;
  retypePassword: string;
  roles: UserRoleType[];
};

export type RegisterFormProps = {
  children?: ReactNode;
  hasRoleField?: boolean;
  onSubmitForm: (data: RegisterFormDataType) => Promise<void>;
};
