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

export const VerificationRequestsTable = (props: any) => {
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
                <TableCell>{t("Vehicle")}</TableCell>
                <TableCell>{t("Driver")}</TableCell>
                <TableCell>{t("Created at")}</TableCell>
                <TableCell>{t("Model")}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((vehicle: any) => {
                const isSelected = selected.includes(vehicle.id);
                const created_at = format(Date.parse(vehicle.created_at), "dd/MM/yyyy");
                const deleted_at = vehicle.deleted_at
                  ? format(Date.parse(vehicle.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(vehicle.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(vehicle.id);
                };

                const handleVehicleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/vehicles-management/vehicle/${vehicle.id}`);
                };
                const handleDriverRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/users-management/users/${vehicle?.__user__.account}`);
                };

                return (
                  <TableRow hover key={vehicle.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(vehicle.id);
                          } else {
                            onDeselectOne?.(vehicle.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={"https://pronto.zbony.com/v1/" + vehicle?.__images__[0]?.image}
                        >
                          {getInitials(vehicle?.__images__[0]?.image ?? "NA")}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {`${vehicle.__brand__.name} (${vehicle?.__brand_model__?.name})`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Link
                        onClick={(event: any) => {
                          handleDriverRoute(event);
                        }}
                        variant="button"
                        underline="none"
                        sx={{ cursor: "pointer" }}
                      >
                        {vehicle?.__user__?.name}
                      </Link>
                    </TableCell>
                    <TableCell>{created_at}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <MenuButton items={[{ label: "View", onClick: handleVehicleRoute }]} />
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

VerificationRequestsTable.propTypes = {
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
