import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useVehicle } from "@/hooks/use-vehicles";
import { useTranslation } from "react-i18next";
import { VehiclesSearch } from "@/sections/vehicles/vehicles-search";
import { useSelection } from "@/hooks/use-selection";
import { VerificationRequestsTable } from "@/sections/vehicles/verification-requests-table";
import VehicleContextProvider from "@/contexts/vehicle-context";
const Page = () => {
  const { t } = useTranslation();

  const vehicleContext = useVehicle();

  // Pagination Controls
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
     filter: [{
      key: "",
      value: ""
    }],
  });

  // Extracting and Storing vehicles' Id (if vehicles context is found);
  const vehiclesIds: any[] | undefined = useMemo(
    () => vehicleContext?.unverifiedVehicles.map((vehicle: any) => vehicle.id),
    [vehicleContext?.unverifiedVehicles]
  );
  const vehiclesSelection = useSelection(vehiclesIds);
  // Pageination control
  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };
  // Page limit control
  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  // Search control
const handleSearch = (event: any) => {
    const txt = (event.target.value).toString()
    setController({
      ...controller,
      page: 0,
      filter: [
      {
        key: "color",
        value: txt
      },
      {
        key: "brand_model_id",
        value: txt
      },
      {
        key: "brand_id",
        value: txt
      },
      {
        key: "year",
        value: txt
      },
      ],
    });
  };


  // Fetching vehicles using control
  useEffect(() => {
    vehicleContext?.fetchUnverifiedVehicles(controller.page, controller.rowsPerPage,controller.filter);
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Verification Requests")} | Pronto</title>
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
                <Typography variant="h4">{t("Verification Requests")}</Typography>
              </Stack>
            </Stack>
            <VehiclesSearch onSearchChange={handleSearch} />
            {(vehicleContext == undefined || vehicleContext?.unverifiedCount > 0) && (
              <VerificationRequestsTable
                count={vehicleContext?.unverifiedCount}
                items={vehicleContext?.unverifiedVehicles}
                onDeselectAll={vehiclesSelection.handleDeselectAll}
                onDeselectOne={vehiclesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={vehiclesSelection.handleSelectAll}
                onSelectOne={vehiclesSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={vehiclesSelection.selected}
                handleSuspend={vehicleContext?.suspendVehicle}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <VehicleContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </VehicleContextProvider>
);

export default Page;
