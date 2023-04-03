import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import COLORS from "../../constants/colors";
import { useGetAllQuestionsQuery } from "../../api/QuestionsAPI";

const ManagementScreen = () => {
  const [type, setType] = useState("user");
  const { data } = useGetAllQuestionsQuery({ keyWord: "c", sortField: "id" });

  const handleSelectType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  console.log("data: ", data);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          backgroundColor: COLORS.WHITE,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Start: Questions/Users */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: COLORS.WHITE }}
        >
          <Select value={type} onChange={handleSelectType} displayEmpty>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="question">Question</MenuItem>
          </Select>
        </FormControl>
        {/* End: Questions/Users */}

        {/* Search */}
        <TextField
          label="Search"
          sx={{
            minWidth: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Search */}
        {/* Start: Search - Add new Question/User */}
        <IconButton size="large">
          <AddCircleIcon sx={{ fontSize: 48, color: COLORS.YELLOW }} />
        </IconButton>
        {/* End: Search - Add new Question/User */}
      </Box>
      {/* Table */}
      {/* Table */}
    </Box>
  );
};

export default ManagementScreen;
