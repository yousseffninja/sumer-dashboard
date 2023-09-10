import { useTranslation } from 'react-i18next';
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
import React from 'react';
import { IOfficesFinancialsBalance } from '@/@types/offices-financials-balance';
import OfficeBalanceRow from '@/sections/financials/office-balance-row';

export const OfficesBalanceTable = (props: any) => {
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
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Phone')}</TableCell>
                <TableCell>{t('Username')}</TableCell>
                <TableCell>{t('Account')}</TableCell>
                <TableCell>{t('Balance')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((offices: IOfficesFinancialsBalance) => (
                <OfficeBalanceRow
                  key={offices.id}
                  office={offices}
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
}