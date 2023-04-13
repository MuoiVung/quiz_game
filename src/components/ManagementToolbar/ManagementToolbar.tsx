import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import {
  AddButton,
  ManagementTypeContainer,
  MobileAddButton,
  SelectContainer,
  SelectItem,
} from "./styles";
import { ManagementToolbarProps } from "./types";

const ManagementToolbar = ({
  managementType,
  onSelectMangementType,
  onSearch,
  listOrder,
  onSelectOrder,
  questionSortField,
  onSortQuestion,
  userSortField,
  onSortUser,
  onOpenModal,
}: ManagementToolbarProps) => {
  return (
    <Stack spacing={2}>
      <ManagementTypeContainer direction="row" justifyContent="space-between">
        <FormControl>
          <InputLabel id="select-table-label">Select Table</InputLabel>
          <Select
            labelId="select-table-label"
            value={managementType}
            onChange={onSelectMangementType}
            displayEmpty
            label="Mangement"
            sx={{
              minWidth: "150px",
            }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="question">Question</MenuItem>
          </Select>
        </FormControl>

        <AddButton
          onClick={onOpenModal}
          startIcon={<AddCircleIcon />}
          variant="contained"
        >
          {managementType === "user" ? "Add User" : "Add Question"}
        </AddButton>

        <Tooltip
          title={managementType === "question" ? "Add question" : "Add user"}
        >
          <MobileAddButton onClick={onOpenModal}>
            <AddCircleIcon className="mobile-add-icon" />
          </MobileAddButton>
        </Tooltip>
      </ManagementTypeContainer>

      <Stack
        direction={{ sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        {/* Search */}
        <TextField
          label={managementType === "user" ? "Search User" : "Search Question"}
          onChange={onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Search */}
        {/* Start: Order */}
        <SelectContainer
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <SelectItem>
            <InputLabel id="select-order-label">Select Order</InputLabel>
            <Select
              labelId="select-order-label"
              value={listOrder}
              onChange={onSelectOrder}
              label="Select Order"
            >
              <MenuItem value="ASC">ASC</MenuItem>
              <MenuItem value="DESC">DESC</MenuItem>
            </Select>
          </SelectItem>
          {/* End: Order */}
          {/* Start: Sort */}
          <SelectItem>
            <InputLabel id="select-sort-label">Select Sort</InputLabel>
            {managementType === "question" && (
              <Select
                labelId="select-sort-question-label"
                value={questionSortField}
                onChange={onSortQuestion}
                label="Select Sort"
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="createdAt">Created At</MenuItem>
                <MenuItem value="updatedAt">Updated At</MenuItem>
              </Select>
            )}
            {managementType === "user" && (
              <Select
                value={userSortField}
                onChange={onSortUser}
                label="Select Sort"
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="created_at">Created Day</MenuItem>
                <MenuItem value="updated_at">Updated Day</MenuItem>
              </Select>
            )}
          </SelectItem>
        </SelectContainer>
      </Stack>
    </Stack>
  );
};

export default ManagementToolbar;
