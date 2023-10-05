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

export const ConsultaionsTable = (props: any) => {
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
                <TableCell>{t('Consultation Name')}</TableCell>
                <TableCell>{t('Consultation Specialization')}</TableCell>
                <TableCell>{t('balance')}</TableCell>
                <TableCell>{t('price')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((consultation: any) => {
                const isSelected = selected.includes(consultation._id);
                const created_at = consultation.createdAt? format(Date.parse(consultation.createdAt), "dd/MM/yyyy") : null;
          
                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`consultations/${consultation._id}`);
                };

                return (
                  <TableRow hover key={consultation.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) =>  {
                          if (event.target.checked) {
                            onSelectOne?.(consultation._id);
                          } else {
                            onDeselectOne?.(consultation._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{consultation._id}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={consultation.owner.userPhoto}>{getInitials(consultation.owner.name)}</Avatar>
                        <Typography variant="subtitle2">{consultation.owner.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{consultation.Specialization}</TableCell>
                    <TableCell>{consultation.balance}</TableCell>
                    <TableCell>
                  {  consultation.price}
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

ConsultaionsTable.propTypes = {
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
