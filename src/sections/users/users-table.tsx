import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  SvgIcon,
  Stack,
  TablePagination,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import { MenuButton } from '@/components/button-menu';
import { useRouter } from 'next/router';
import {useTranslation} from 'react-i18next';

export const UsersTable = (props: any) => {
  const router = useRouter();
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleSuspend = () => {},
    rowsPerPage,
    selected,
    setSelectedRole,
    selectedRole,
    isAdmin=false
  } = props;

  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleApplyFilter = () => {
    // Apply the filter logic here based on the selectedRole
    // You may want to call a callback function to update the filtered data
    // For now, let's just close the filter modal
    handleCloseFilter();
  };

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value as string);
  };

  const {t} = useTranslation();

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = items?(items.length > 0) && selected.length === items.length: false;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <Button variant="outlined" onClick={handleOpenFilter}>
          {t('Filter by Role')}
        </Button>
      </Box>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={handleCloseFilter}>
        <DialogTitle>{t('Role Filter')}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>{t('All Roles')}</em>
              </MenuItem>
              <MenuItem value="admin">{t('admin')}</MenuItem>
              <MenuItem value="individual">{t('individual')}</MenuItem>
              <MenuItem value="salon service">{t('salon service')}</MenuItem>
              <MenuItem value="consultant">{t('consultant')}</MenuItem>
              {/* Add more roles as needed */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilter} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleApplyFilter} color="primary">
            {t('Apply')}
          </Button>
        </DialogActions>
      </Dialog>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>{t('#')}</TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Phone')}</TableCell>
                <TableCell>{t('role')}</TableCell>
                <TableCell>{t('balance')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>{t('Status')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user: any) => {
                const isSelected = selected.includes(user.id);
                const created_at = format(Date.parse(user.createdAt), "dd/MM/yyyy");
              
                // const [checked, setChecked] = useState(user.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(user.id);
                };
                
                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  if(isAdmin){
                    router.push(`/users/${user._id}`);
                  }
                  else{

                    router.push(`/users/${user._id}`);
                  }
                };
                const handleRouteEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/admins/update-admin/${user?.id}`);
                };

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) =>  {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>{user._id}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={user.userPhoto}>{getInitials(user.name)}</Avatar>
                        <Typography variant="subtitle2">{user.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell><span  style={{display: "flex",flexDirection: "row-reverse",direction: "ltr"}}>{user.phone}</span></TableCell>
                    <TableCell>{t(user.role)}</TableCell>
                    <TableCell>{t(user.balance)}</TableCell>
                    <TableCell>{created_at}</TableCell>
                    <TableCell><Typography sx={{ color: user.emailActive === true ? "green" : "red" }}>{t(user.emailActive === true ? "Active" : "Inactive")}</Typography></TableCell>
                        <TableCell>
                          <MenuButton 
                            items={isAdmin?[
                                {label: "View", onClick: handleRoute},
                                {label: "Edit",onClick:handleRouteEdit}
                               
                            ]:
                            [
                              {label: "View", onClick: handleRoute},
                            ]
                          }
                          />
                        </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleSuspend: PropTypes.func,
  rowsPerPage: PropTypes.number,
  isAdmin: PropTypes.any,
  selected: PropTypes.array,
  setSelectedRole: PropTypes.func,
  selectedRole: PropTypes.string
};
