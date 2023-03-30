import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../api/AuthAPI";
import { useGetPlayQuestionsQuery } from "../../api/QuestionsAPI";
import { logout, selectRefreshToken } from "../../store/features/authSlice";
import { useAppDispatch, useTypedSelector } from "../../store/store";

const PlayScreen = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const { data } = useGetPlayQuestionsQuery({ total: 10 });
  const refreshToken = useTypedSelector(selectRefreshToken);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutMutation({ refresh_token: refreshToken });
      }
      dispatch(logout());
    } catch (error) {
      let errorMessage = "Logout error. Something went wrong!";

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  console.log("data: ", data);

  return (
    <div>
      PlayScreen
      <LoadingButton loading={isLoading} onClick={handleLogout}>
        Logout
      </LoadingButton>
    </div>
  );
};

export default PlayScreen;
