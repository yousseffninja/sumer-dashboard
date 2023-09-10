import {
  Card,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, SvgIcon
} from '@mui/material';

import { Scrollbar } from "@/components/scrollbar";
import { useTranslation } from 'react-i18next';
import React from 'react';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import TransactionsRow from '@/sections/financials/transcations-row';
import PropTypes from 'prop-types';

export const TransactionsTable = (props: any) => {
  const { t } = useTranslation();
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selectedAll}
                    // indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{t('Order_Number')}</TableCell>
                <TableCell>{t('Type')}</TableCell>
                <TableCell>{t('Order_Status')}</TableCell>
                <TableCell>{t('Amount')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((transactions: any) => (
                <TransactionsRow
                  key={transactions.id}
                  transaction={transactions}
                  selected={selected}
                  onSelectOne={onSelectOne}
                  onDeselectOne={onDeselectOne}
                  handleSuspend={handleSuspend}
                />
              ))}
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

TransactionsTable.propTypes = {
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
  selected: PropTypes.array,
};