import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useSelection } from "@/hooks/use-selection";
import { useTranslation } from "react-i18next";
import { useOffice } from "@/hooks/use-offices";
import { useSalon } from "@/hooks/use-salon";
import { useConsultation } from "@/hooks/use-consultation";
import OfficeContextProvider from "@/contexts/offices-context";
import { ConsultaionsTable } from "@/sections/consultations/consultation-table";
import { OfficesSearch } from "@/sections/offices/office-search";

const Page = () => {
  const { t } = useTranslation();
  const OfficeContext = useOffice();
  const SalonContext = useSalon();
  const ConsultationContext = useConsultation();
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

  const salonsIds: any[] | undefined = useMemo(
    () =>
      SalonContext == undefined
        ? undefined
        : SalonContext?.salons.map((salon: any) => salon.id),
    [SalonContext]
  );

  const consultationsIds: any[] | undefined = useMemo(
    () =>
      ConsultationContext == undefined
        ? undefined
        : ConsultationContext?.consultations.map((consultation: any) => consultation.id),
    [ConsultationContext]
  );

  const salonsSelection = useSelection(salonsIds);

  const officesSelection = useSelection(officesIds);

  const consultationsSelection = useSelection(consultationsIds);

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
    SalonContext?.fetchSalons(controller.page, controller.rowsPerPage, controller.filter);
    ConsultationContext?.fetchConsultations(controller.page, controller.rowsPerPage, controller.filter);
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Consultations")} | Pronto</title>
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
                <Typography variant="h4">{t("Consultations")}</Typography>
              </Stack>
            </Stack>
            <OfficesSearch onSearchChange={handleSearch} />
            <ConsultaionsTable
                count={ConsultationContext?.count}
                items={ConsultationContext?.consultations}
                onDeselectAll={consultationsSelection.handleDeselectAll}
                onDeselectOne={consultationsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={consultationsSelection.handleSelectAll}
                onSelectOne={consultationsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={consultationsSelection.selected}
                // handleSuspend={OfficeContext?.suspendOffice}
              />
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
