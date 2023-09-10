import { useTranslation } from 'react-i18next';
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, SvgIcon
} from '@mui/material';
import { Scrollbar } from '@/components/scrollbar';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import { DriverBalanceRow } from '@/sections/financials/driver-balance-row';

export const DriverBalanceTable = (props: any) => {
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
    handleFunction = (id: string) => {},
    handleSuspend = () => {},
    rowsPerPage,
    selected,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Id')}</TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Order Id')}</TableCell>
                <TableCell>{t('Account Balance')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((drivers: any) => (
                <DriverBalanceRow
                  key={drivers.id}
                  drivers={drivers}
                  selected={selected}
                  onSelectOne={onSelectOne}
                  onDeselectOne={onDeselectOne}
                  handleSuspend={handleSuspend}
                  handleFunction={() => handleFunction(drivers.id)}
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
  )
}