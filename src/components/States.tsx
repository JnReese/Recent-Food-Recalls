import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { allStates } from "../allStates";
import DataDisplay from "./DataDisplay";
import styled from "styled-components";

interface StateInfo {
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicSelect({ setStateFilter }: StateInfo) {
  const [unitedState, setUnitedState] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUnitedState(event.target.value as string);
    setStateFilter(event.target.value as string);
  };

  return (
    <Container className="stateAndDisplayContainer">
      <Box sx={{ minWidth: 120, margin: "0 auto" }}>
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
`;
