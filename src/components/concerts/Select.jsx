import { MenuItem, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const SelectRole = ({ state }) => {
  const handleChange = (event) => {
    state.setRole(event.target.value);
  };
  return (
    <Stack direction="row" alignItems="center">
      Роля:
      <Box width="5px"/>
      <Select
        id="demo-simple-select"
        value={state.role}
        onChange={handleChange}
        variant="standard"
      >
        <MenuItem value="listener">Слушател</MenuItem>
        <MenuItem value="musician">Изпълнител</MenuItem>
      </Select>
    </Stack>
  );
};

export default SelectRole;
