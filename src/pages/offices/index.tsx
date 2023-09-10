import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useSelection } from "@/hooks/use-selection";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useOffice } from "@/hooks/use-offices";
import OfficeContextProvider from "@/contexts/offices-context";
import { OfficesTable } from "@/sections/offices/offices-table";
import { OfficesSearch } from "@/sections/offices/office-search";
import NextLink from "next/link";

const Page = () => {
  const { t } = useTranslation();
  const OfficeContext = useOffice();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [{
      key: "",
      value: ""
    }],
  });

  const officesIds: any[] | undefined = useMemo(
    () =>
      OfficeContext == undefined
        ? undefined
        : OfficeContext?.offices.map((office: any) => office.id),
    [OfficeContext]
  );

  const officesSelection = useSelection(officesIds);

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

  const handelAddNew = (event: any) => {
    //navigate to Add form page
    //-can be made with link ??
  };

  const handleSearch = (event: any) => {
    const txt = (event.target.value).toString()
    setController({
      ...controller,
      page: 0,
      filter: [{
        key: "name",
        value: txt
      },
      {
        key: "account",
        value: txt
      },
      ],
    });
  };

  useEffect(() => {
    OfficeContext?.fetchOffices(controller.page, controller.rowsPerPage,controller.filter);
    
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Offices")} | Pronto</title>
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
                <Typography variant="h4">{t("Offices")}</Typography>
              </Stack>
              <div>
                  <Button
                    component={NextLink}
                    href="/offices/add"
                    onClick={handelAddNew}
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    {t("Add")}
                  </Button>
              </div>
            </Stack>
            <OfficesSearch onSearchChange={handleSearch} />
            {(OfficeContext == undefined || OfficeContext?.count > 0) && (
              <OfficesTable
                count={OfficeContext?.count}
                items={OfficeContext?.offices}
                onDeselectAll={officesSelection.handleDeselectAll}
                onDeselectOne={officesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={officesSelection.handleSelectAll}
                onSelectOne={officesSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={officesSelection.selected}
                handleSuspend={OfficeContext?.suspendOffice}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <OfficeContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </OfficeContextProvider>
);

export default Page;
