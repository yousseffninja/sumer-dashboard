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
} from "@mui/material";
import React from "react";
import { Scrollbar } from "../../components/scrollbar";
import { getInitials } from "../../utils/get-initials";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import { MenuButton } from "@/components/button-menu";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const ProductsTable = (props: any) => {
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

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

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
                <TableCell>{t("Product Name")}</TableCell>
                <TableCell>{t("Category")}</TableCell>
                <TableCell>{t("Owner")}</TableCell>
                <TableCell>{t("Price")}</TableCell>
                <TableCell>{t("Size")}</TableCell>
                <TableCell>{t("count")}</TableCell>
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
                        <Avatar
                          src={product?.imageArray[0]?.ProductPhotoPerview}
                        >
                          {getInitials(product?.imageArray[0]?.ProductPhotoPerview ?? "NA")}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {`${product.name} (${product?.name})`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product?.category?.name}
                    </TableCell>
                    <TableCell>
                      <Link
                        underline="hover"
                        variant="subtitle2"
                        onClick={handleUser}
                      >
                        {product?.owner?.stockName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {product?.price}
                    </TableCell>
                    <TableCell>
                      {t(product?.size)}
                    </TableCell>
                    <TableCell>
                      {product?.availabilityCount}
                    </TableCell>
                    {/* <TableCell>{created_at}</TableCell> */}
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

ProductsTable.propTypes = {
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
