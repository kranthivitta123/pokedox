import React from "react";
import { FormControlLabel, Box, Checkbox } from "@mui/material";

const MuiCheckBox = (props) => {
  const { isChecked } = props;
  return (
    <Box>
      <FormControlLabel
        label={props.label}
        control={
          <Checkbox
            checked={isChecked}
            size="small"
            color="default"
            onChange={() => props.change(props.label, !isChecked)}
          />
        }
      />
    </Box>
  );
};

export default MuiCheckBox;
