import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { allStates } from "../allStates";
import DataDisplay from "./DataDisplay";

interface StateInfo {
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicSelect({ setStateFilter }: StateInfo) {
  const [unitedState, setUnitedState] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUnitedState(event.target.value as string);
    setStateFilter(event.target.value as string);
  };

  console.log(unitedState, "honk");

  return (
    <div className="stateAndDisplayContainer">
      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unitedState}
            label="Age"
            onChange={handleChange}
          >
            {allStates.map((state) => (
              <MenuItem value={state} key={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {unitedState ? <DataDisplay /> : null}
    </div>
  );
}
