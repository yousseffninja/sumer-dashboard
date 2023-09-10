import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from "react-i18next";

export default function BasicSelect(
  {
    inputLabel,
    options,
    handleFormChange,
    branch_id,
    values

  }: {
    inputLabel: string,
    options: IOption[],
    values:string|undefined,
    handleFormChange:any
    branch_id:string,
  }
) {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
    handleFormChange(event)
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t(inputLabel)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values}
          name={branch_id}
          onChange={handleChange}
        >
          {options.map(({ id, name, value }: IOption, index) => (
            <MenuItem key={id ?? index} value={ id ?? value ?? name}>{t(name)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
interface IOption {
  id?: number;
  name: string;
  value?: string;
  country?: string;
}