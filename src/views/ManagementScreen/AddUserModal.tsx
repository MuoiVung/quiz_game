import { toast } from "react-toastify";

import { ErrorResponseType } from "../../api/AuthAPI/types";
import { useCreateUserMutation } from "../../api/UsersAPI";
import FormModal from "../../components/FormModal/FormModal";
import FormModalButton from "../../components/FormModalButton/FormModalButton";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { AddUserFormType, BasicModalProps } from "./types";

const AddUserModal = ({ isOpen, onCloseModal }: BasicModalProps) => {
  const [addUser, { isLoading: isAddUserLoading }] = useCreateUserMutation();

  const handleAddUser = async (data: AddUserFormType) => {
    const addUserFormData: AddUserFormType = JSON.parse(JSON.stringify(data));
    if (addUserFormData.roles.length === 0) {
      addUserFormData.roles.push("user");
    }
    try {
      await addUser(addUserFormData).unwrap();

      onCloseModal();
    } catch (error) {
      const errorMessage = (error as ErrorResponseType).data.message;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <FormModal
      isLoading={isAddUserLoading}
      onClose={handleCloseModal}
      open={isOpen}
      title="Add User"
    >
      <RegisterForm onSubmitForm={handleAddUser} hasRoleField>
        <FormModalButton
          loading={isAddUserLoading}
          onCloseModal={handleCloseModal}
        />
      </RegisterForm>
    </FormModal>
  );
};

export default AddUserModal;
