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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { Scrollbar } from "../../components/scrollbar";
import { getInitials } from "../../utils/get-initials";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import { MenuButton } from "@/components/button-menu";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const VoucherTable = (props: any) => {
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
    onCreateVoucher,
  } = props;

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({
    code: '',
    discountPercentage: '',
    maxDiscount: '',
    expireDate: '',
    type: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    // Validate form data here before creating the voucher
    // You can add validation logic to ensure data meets your requirements

    // Assuming validation passes, call the onCreateVoucher function
    onCreateVoucher(formData);

    // Clear form data
    setFormData({
      code: '',
      discountPercentage: '',
      maxDiscount: '',
      expireDate: '',
      type: '',
    });

    // Close the modal
    onClose();
  };


  return (
    <Card>
      <Button onClick={() => setOpen(true)}>Create Voucher</Button>
      <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Voucher</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Discount Percentage"
          name="discountPercentage"
          type="number"
          value={formData.discountPercentage}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Max Discount"
          name="maxDiscount"
          type="number"
          value={formData.maxDiscount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Expire Date"
          name="expireDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.expireDate}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="Salon">Salon</MenuItem>
            <MenuItem value="Consultant">Consultant</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
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
                <TableCell>{t("Voucher code")}</TableCell>
                <TableCell>{t("discountPercentage")}</TableCell>
                <TableCell>{t("maxDiscount")}</TableCell>
                <TableCell>{t("owned")}</TableCell>
                <TableCell>{t("used")}</TableCell>
                <TableCell>{t("type")}</TableCell>
                <TableCell>{t("Expire At")}</TableCell>
                {/* <TableCell>{t("Created at")}</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product: any) => {
                const isSelected = selected.includes(product._id);
                const created_at = format(Date.parse(product.expireDate), "dd/MM/yyyy");
                
                // const [checked, setChecked] = useState(vehicle.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(product.id);
                };

                const handleProductRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/products/${product._id}`);
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
                          {`${product.code}`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product?.discountPercentage}%
                    </TableCell>
                    <TableCell>
                      {product?.maxDiscount}
                    </TableCell>
                    <TableCell>
                      {product?.owned ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {product?.used ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {t(product?.type)}
                    </TableCell>
                    <TableCell>
                      {created_at}
                    </TableCell>
                    {/* <TableCell>{created_at}</TableCell> */}
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

VoucherTable.propTypes = {
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
  onCreateVoucher: PropTypes.func,
};
