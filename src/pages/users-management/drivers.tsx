import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { UsersTable } from "@/sections/users/users-table";
import { UsersSearch } from "@/sections/users/users-search";
import { useSelection } from "@/hooks/use-selection";
import { useDriver } from "@/hooks/use-drivers";
import { useTranslation } from "react-i18next";
import DriverContextProvider from "@/contexts/driver-context";

const Page = () => {
  const { t } = useTranslation();
  const driverContext = useDriver();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [
      {
        key: "",
        value: "",
      },
    ],
  });

  const driversIds: any[] | undefined = useMemo(
    () =>
      driverContext == undefined
        ? undefined
        : driverContext?.drivers.map((driver: any) => driver.id),
    [driverContext]
  );

  const driversSelection = useSelection(driversIds);

  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleSearch = (event: any) => {
    const txt = event.target.value.toString();
    setController({
      ...controller,
      page: 0,
      filter: [
        {
          key: "name",
          value: txt,
        },
        {
          key: "account",
          value: txt,
        },
        {
          key: "phone",
          value: txt,
        },
      ],
    });
  };

  useEffect(() => {
    driverContext?.fetchDrivers(controller.page, controller.rowsPerPage, controller.filter);
    
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Drivers")} | Pronto</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Drivers")}</Typography>
              </Stack>
            </Stack>
            <UsersSearch onSearchChange={handleSearch} />
            {(driverContext == undefined || driverContext?.count > 0) && (
              <UsersTable
                count={driverContext?.count}
                items={driverContext?.drivers}
                onDeselectAll={driversSelection.handleDeselectAll}
                onDeselectOne={driversSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={driversSelection.handleSelectAll}
                onSelectOne={driversSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={driversSelection.selected}
                handleSuspend={driverContext?.suspendDriver}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DriverContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </DriverContextProvider>
);

export default Page;
