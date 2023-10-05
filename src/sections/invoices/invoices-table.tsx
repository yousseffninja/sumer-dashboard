import PropTypes from "prop-types";
import { format } from "date-fns";
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
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  MenuItem,
  FormControl,
  Select,
  DialogActions,
} from "@mui/material";
import React from "react";
import { Scrollbar } from "../../components/scrollbar";
import { getInitials } from "../../utils/get-initials";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import { MenuButton } from "@/components/button-menu";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const IvoicesTable = (props: any) => {
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
    selectedRole,
    setSelectedRole
  } = props;

  const [filterOpen, setFilterOpen] = React.useState(false);

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

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <Button variant="outlined" onClick={handleOpenFilter}>
          {t('Filter by Date')}
        </Button>
      </Box>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={handleCloseFilter}>
        <DialogTitle>{t('Date Filter')}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>{t('All Dates')}</em>
              </MenuItem>
              <MenuItem value="today">{t('Today')}</MenuItem>
              <MenuItem value="week">{t('This Week')}</MenuItem>
              <MenuItem value="month">{t('This Month')}</MenuItem>
              <MenuItem value="year">{t('This Year')}</MenuItem>
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
                <TableCell>{t("Invoice Number")}</TableCell>
                <TableCell>{t("total amount")}</TableCell>
                <TableCell>{t("status")}</TableCell>
                {/* <TableCell>{t("Created at")}</TableCell> */}
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product: any) => {
                const isSelected = selected.includes(product._id);
                // const created_at = format(Date.parse(vehicle.createAt), "dd/MM/yyyy");
              
                // const [checked, setChecked] = useState(vehicle.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(product.id);
                };

                const handleProductRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/invoices/${product._id}`);
                };
                const handleUser = () => {
                  router.push(`/users/${product?.owner?._id}`);
                };

                return (
                  <TableRow hover key={product._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(product._id);
                          } else {
                            onDeselectOne?.(product._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {`${product.invoiceId}`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product?.totalAmount}
                    </TableCell>
                    <TableCell>
                      {t(product?.transactions[0]?.status[product?.transactions[0]?.status.length - 1]?.status)}
                    </TableCell>
                    <TableCell>
                      <MenuButton items={[{ label: "View", onClick: handleProductRoute }]} />
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

IvoicesTable.propTypes = {
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
  selectedRole: PropTypes.string,
  setSelectedRole: PropTypes.func,
};
