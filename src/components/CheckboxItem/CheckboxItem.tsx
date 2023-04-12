import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { CheckboxItemType } from "./types";

const CheckboxItem = ({
  extraProps,
  label,
  defaultChecked = false,
}: CheckboxItemType) => {
  return (
    <Grid item xs={6} md={6} lg={3}>
      <FormControlLabel
        {...extraProps}
        control={<Checkbox defaultChecked={defaultChecked} />}
        label={label}
      />
    </Grid>
  );
};

export default CheckboxItem;
