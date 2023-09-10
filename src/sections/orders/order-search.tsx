import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MultipleSelect from '@/components/basic-select';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Grid,
  TextField,
  Autocomplete
} from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useState } from 'react';
import { useDriver } from '@/hooks/use-drivers';
import axiosClient from '@/configs/axios-client';
interface Option {
  key: string;
  value: string;
}
export const OrdersSearch = (props: any) => {
  const {t}= useTranslation();
  const { filter, onSearchChange, handleChangeStartDate, handleChangeEndDate, options ,handleSelect, handleChange, handleExport,anchorEl,setAnchorEl,handleClose,selectedOption,handleClear} = props;

  const [drivers, setDrivers] = useState<any[]>([]);
  const driverContext = useDriver()
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const get_drivers = async () => {
    const res =  await axiosClient.get('/drivers');
    setDrivers(res.data.data);
  }

  const filterOptions = (options: any[], state: any) => {
    return options.filter((option: any) =>
      option.name.toLowerCase().includes(state.inputValue)
    );
  };

  useEffect(() => {
    get_drivers();
  }, [])

  return (
  <Card sx={{ p: 2 }}>
    <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
      <OutlinedInput
        defaultValue=""
        onChange={onSearchChange}
        fullWidth
        placeholder={`${t("Search")}`}
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 , mr:5}}
      />
      <Grid sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        {/*<MultipleSelect branch_id={"branch_a_id"} handleFormChange={handleChange} options={drivers} inputLabel='Drivers' values={undefined} />*/}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={drivers}
          onChange={handleChange}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          filterOptions={filterOptions}
          renderInput={(params) => <TextField {...params} label={t('Drivers')} />}
        />
        <Button onClick={handleClick}>
          {selectedOption ? t(selectedOption.value) : t('Search By Status')}
        </Button>
        {selectedOption && (
          <Button onClick={handleClear} color="error">
            <SvgIcon fontSize="small">
              <CancelPresentationIcon />
            </SvgIcon>
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options && options.map((option:Option) => (
            <MenuItem key={option.value} onClick={() => handleSelect(option)}>
              {t(option.value)}
            </MenuItem>
          ))}
        </Menu>
        <Button onClick={() => handleExport()}>
          {t('Export')}
        </Button>
      </Grid>
    </Grid>
    <Grid sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", mt: 3 }}>
      <TextField
        placeholder={`${t("Start Date")}`}
        onChange={handleChangeStartDate}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <CalendarMonthIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        placeholder={`${t("End Date")}`}
        onChange={handleChangeEndDate}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <CalendarMonthIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  </Card>
  );
};

OrdersSearch.propTypes = {
  filter: PropTypes.string,
  options: PropTypes.any,
  onSearchChange: PropTypes.func,
  handleSelect: PropTypes.func,
  handleExport: PropTypes.func,
  handleChange: PropTypes.func,
  handleChangeStartDate: PropTypes.func,
  handleChangeEndDate: PropTypes.func,
  anchorEl: PropTypes.any
  ,setAnchorEl: PropTypes.any
  ,handleClear: PropTypes.func
  ,selectedOption: PropTypes.any
  ,handleClose: PropTypes.any
};
