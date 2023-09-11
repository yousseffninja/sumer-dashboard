import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useProduct } from "@/hooks/use-product";
import { useTranslation } from "react-i18next";
import { VehiclesSearch } from "@/sections/products/vehicles-search";
import { ProductsTable } from "@/sections/products/vehicles-table";
import { useSelection } from "@/hooks/use-selection";
import VehicleContextProvider from "@/contexts/vehicle-context";
const Page = () => {
  const { t } = useTranslation();

  const productContext = useProduct();

  // Pagination Controls
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

  const productsIds: any[] | undefined = useMemo(
    () => productContext?.product.map((product: any) => product.id),
    [productContext?.product]
  );
  const productsSelection = useSelection(productsIds);

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
    const txt = event.target.value.toString();
    setController({
      ...controller,
      page: 0,
      filter: [
        {
          key: "color",
          value: txt,
        },
        {
          key: "brand_model_id",
          value: txt,
        },
        {
          key: "brand_id",
          value: txt,
        },
        {
          key: "year",
          value: txt,
        },
      ],
    });
  };

  useEffect(() => {
    productContext?.fetchProducts(controller.page, controller.rowsPerPage);
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Products")} | Sumer</title>
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
                <Typography variant="h4">{t("Products")}</Typography>
              </Stack>
            </Stack>
            <VehiclesSearch onSearchChange={handleSearch} />
            {(productContext == undefined || productContext?.count > 0) && (
              <ProductsTable
                count={productContext?.count}
                items={productContext?.product}
                onDeselectAll={productsSelection.handleDeselectAll}
                onDeselectOne={productsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={productsSelection.handleSelectAll}
                onSelectOne={productsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={productsSelection.selected}
                // handleSuspend={vehicleContext?.suspendVehicle}
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
