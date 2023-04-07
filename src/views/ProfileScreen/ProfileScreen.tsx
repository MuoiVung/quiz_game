import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import {
  useChangePasswordMutation,
  useGetUserProfleQuery,
  useUploadAvatarMutation,
} from "../../api/UsersAPI";
import LoadingScreen from "../../components/LoadingScreen";
import COLORS from "../../constants/colors";
import CustomModal from "../../components/CustomModal";
import { ChangePasswordFormDataType } from "./types";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { ErrorResponseType } from "../../api/AuthAPI/types";

const defaultValues: ChangePasswordFormDataType = {
  currentPassword: "",
  newPassword: "",
  retypePassword: "",
};

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    retypePassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters")
      .oneOf([yup.ref("newPassword")], "New passwords do not match"),
  })
  .required();

const ProfileScreen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormDataType>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const location = useLocation();
  const userId: number = location.state?.userId;

  const {
    data: userProfileData,
    isLoading: isGetUserProfileLoading,
    isFetching: isGetUserProfileFetching,
  } = useGetUserProfleQuery();

  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  const [uploadAvatar] = useUploadAvatarMutation();

  const [avatarUrl, setAvatarUrl] = useState(
    userProfileData?.avatar_link || ""
  );

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfileData?.avatar_link) {
      setAvatarUrl(userProfileData.avatar_link);
    }
  }, [userProfileData?.avatar_link]);

  if (isGetUserProfileLoading || isGetUserProfileFetching) {
    return <LoadingScreen />;
  }

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || !files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", files[0]);

    try {
      const response = await toast.promise(
        () => uploadAvatar({ userId, formData }).unwrap(),
        {
          pending: "Uploading...",
          success: "Uploaded avatar successfully",
          error: "Failed to upload avatar",
        }
      );

      setAvatarUrl(response.data);
    } catch (error) {
      console.error("Faild to upload avatar");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleChangePassword = async (data: ChangePasswordFormDataType) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      reset();
      toast.success("Changed Password successfully");
      handleCloseChangePasswordModal();
    } catch (error) {
      const errorMessage = (error as ErrorResponseType).data.message;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 2,
      }}
    >
      <Stack alignItems="center" mt="12px" mb="48px">
        <Typography variant="h3" color={COLORS.BLACK} fontFamily="Poppins">
          Profile
        </Typography>
      </Stack>
      {/* START: Information */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Button
          component="label"
          sx={{
            borderRadius: "999px",
            "&:hover": {
              backgroundColor: COLORS.YELLOW_200,
            },
            "&:active": {
              backgroundColor: COLORS.YELLOW_200,
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChangeAvatar}
            hidden
            ref={fileInputRef}
          />
          <Avatar
            alt="user avatar"
            src={avatarUrl}
            sx={{
              height: 150,
              width: 150,
              objectFit: "cover",
              position: "relative",
              "&:hover": {
                "&::before": {
                  content: '""',
                  display: "block",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "rgba(0,0,0,0.4)",
                  zIndex: 1,
                  opacity: 0,
                  transition: "opacity 0.2s",
                },
                "&::after": {
                  content: '""',
                  display: "block",
                  height: "30%",
                  width: "30%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "transparent",
                  zIndex: 2,
                  opacity: 0,
                  transition: "opacity 0.2s",
                },
              },
              "&:hover::before, &:hover::after": {
                opacity: 1,
              },
            }}
          />
        </Button>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            textTransform="capitalize"
            color={COLORS.YELLOW_600}
          >
            {userProfileData?.name}
          </Typography>
          <Typography color={COLORS.GRAY_700} textTransform="capitalize">
            {userProfileData?.roles.join(", ")}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailOutlinedIcon color="primary" />
            <Typography>{userProfileData?.email}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack mt="24px" alignItems="center">
        <Button variant="outlined" onClick={handleOpenChangePasswordModal}>
          Change Password
        </Button>
      </Stack>
      {/* END: Information */}
      <CustomModal
        open={isChangePasswordModalOpen}
        onClose={handleCloseChangePasswordModal}
      >
        <Typography variant="h4" textAlign="center" mb="16px">
          Change Password
        </Typography>
        <Stack
          component="form"
          sx={{ minWidth: "500px" }}
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <TextField
            required
            {...register("currentPassword")}
            error={errors.currentPassword ? true : false}
            helperText={errors.currentPassword?.message}
            name="currentPassword"
            label="Current Password"
            autoFocus
            fullWidth
            margin="normal"
            autoComplete="true"
            type="password"
          />
          <TextField
            required
            {...register("newPassword")}
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword?.message}
            name="newPassword"
            label="New Password"
            fullWidth
            margin="normal"
            type="password"
            autoComplete="true"
          />
          <TextField
            required
            {...register("retypePassword")}
            error={errors.retypePassword ? true : false}
            helperText={errors.retypePassword?.message}
            name="retypePassword"
            label="Re-type Password"
            fullWidth
            margin="normal"
            type="password"
            autoComplete="true"
          />
          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" my="16px">
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ color: COLORS.WHITE, mr: "12px" }}
              loading={isChangePasswordLoading}
            >
              Save
            </LoadingButton>
            <Button
              color="error"
              variant="contained"
              onClick={handleCloseChangePasswordModal}
              sx={{ color: COLORS.WHITE }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </CustomModal>
    </Container>
  );
};

export default ProfileScreen;
