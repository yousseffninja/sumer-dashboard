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

export const OfficesTable = (props: any) => {
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
                <TableCell>{t('Administrator Name')}</TableCell>
                <TableCell>{t('Office Code')}</TableCell>
                <TableCell>{t('Office Name')}</TableCell>
                <TableCell>{t('Status')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((office: any) => {
                const isSelected = selected.includes(office.id);
                const created_at = office.created_at? format(Date.parse(office.created_at), "dd/MM/yyyy") : null;
                const deleted_at = office.deleted_at
                  ? format(Date.parse(office.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(office.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(office.id);
                };
                
                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`offices/${office.id}`);
                };

                return (
                  <TableRow hover key={office.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) =>  {
                          if (event.target.checked) {
                            onSelectOne?.(office.id);
                          } else {
                            onDeselectOne?.(office.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{office.account}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={office.avatar}>{getInitials(office.name)}</Avatar>
                        <Typography variant="subtitle2">{office.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{office["shipping_office"].code}</TableCell>
                    <TableCell>
                  {  office["shipping_office"].name}
                    </TableCell>
                   
                    <TableCell>
                      <Switch
                        checked={office.deleted_at == null}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                        />
                      {deleted_at}
                    </TableCell>
                      <TableCell>
                    { created_at}
                      </TableCell>
                        <TableCell>
                          <MenuButton 
                            items={[
                              {label: "View", onClick: handleRoute},
                            ]}
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

OfficesTable.propTypes = {
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
  selected: PropTypes.array
};
