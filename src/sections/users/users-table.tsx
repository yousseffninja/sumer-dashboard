import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
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
    isAdmin=false
  } = props;

  const {t} = useTranslation();

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = items?(items.length > 0) && selected.length === items.length: false;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
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
                </TableCell>
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
                    <TableCell padding="checkbox">
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
                    </TableCell>
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
  selected: PropTypes.array
};
