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
import { IvoicesTable } from "@/sections/invoices/invoices-table";
import { useSelection } from "@/hooks/use-selection";
import VehicleContextProvider from "@/contexts/vehicle-context";
const Page = () => {
  const { t } = useTranslation();

  const productContext = useProduct();

  const [selectedRole, setSelectedRole] = useState("");

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
    const today = new Date(); // Current date and time
      today.setHours(0, 0, 0, 0); // Set the time to midnight
  
      const tomorrow = new Date(today); // Create a copy of today
      tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
  
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - 7); // Go back 7 days
      lastWeekStart.setHours(0, 0, 0, 0); // Set the time to midnight

      const lastMonthStart = new Date(today);
      lastMonthStart.setMonth(today.getMonth() - 1); // Go back 1 month
      lastMonthStart.setHours(0, 0, 0, 0); 

      const lastYearStart = new Date(today);
      lastYearStart.setFullYear(today.getFullYear() - 1); // Go back 1 year
      lastYearStart.setHours(0, 0, 0, 0); 

    if (selectedRole === "today") {
      setController({
        ...controller,
        filter: [
          {
            key: "createdAt[gte]",
            value: today.toISOString(), // Start of today
          },
        ],
      });
    } else if (selectedRole === "week") {
      setController({
        ...controller,
        filter: [
          {
            key: "createdAt[gte]",
            value: lastWeekStart.toISOString(), // Start of today
          },
        ],
      });
    } else if (selectedRole === "month") {
      setController({
        ...controller,
        filter: [
          {
            key: "createdAt[gte]",
            value: lastMonthStart.toISOString(), // Start of today
          },
        ],
      });
    } else if (selectedRole === "year") {
      setController({
        ...controller,
        filter: [
          {
            key: "createdAt[gte]",
            value: lastYearStart.toISOString(), // Start of today
          },
        ],
      });
    } else {
      setController({
        ...controller,
        filter: [],
      });
    }
  }, [selectedRole]);

  useEffect(() => {
    productContext?.fetchInvoices(controller.page, controller.rowsPerPage, controller.filter);
  }, [controller]);

  const totlaAmount = productContext?.invoices.map((invoice: any) => invoice.totalAmount).reduce((a: any, b: any) => a + b, 0)

  return (
    <>
      <Head>
        <title>{t("Invoices")} | Sumer</title>
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
                <Typography variant="h4">{t("Invoices")}</Typography>
                <Typography variant="body1">{t("total amount")}: {totlaAmount}</Typography>
              </Stack>
            </Stack>
            <VehiclesSearch onSearchChange={handleSearch} />
            {(productContext == undefined || productContext?.count > 0) && (
              <IvoicesTable
                count={productContext?.count}
                items={productContext?.invoices}
                onDeselectAll={productsSelection.handleDeselectAll}
                onDeselectOne={productsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={productsSelection.handleSelectAll}
                onSelectOne={productsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={productsSelection.selected}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
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
