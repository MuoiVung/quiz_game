import {
  Button,
  FormControl,
  IconButton,
  Select,
  Stack,
  styled,
} from "@mui/material";

export const ManagementTypeContainer = styled(Stack)(({ theme }) => ({
  justifyContent: "space-between",
  marginTop: "24px",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "16px",
    marginBottom: 0,
  },
}));

export const StyledSelect = styled(Select)({
  minWidth: "200px",
});

export const AddButton = styled(Button)(({ theme }) => ({
  minWidth: "160px",
  color: theme.palette.common.WHITE,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const MobileAddButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
  "& .mobile-add-icon": {
    width: "40px",
    height: "40px",
  },
}));

export const SelectContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: 24,
  },
}));

export const SelectItem = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flex: 1,
  [theme.breakpoints.up("sm")]: {
    minWidth: 150,
  },
}));
