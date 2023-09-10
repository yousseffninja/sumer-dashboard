import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { SearchBar } from '@/sections/shared/search-bar';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import { DriverBalanceTable } from '@/sections/financials/driver-balance-table';
import { useFinancials } from '@/hooks/use-financials';
import useAlert from '@/hooks/useAlert';
import TransitionModal from '@/components/TransitionModal';
import { useSelection } from '@/hooks/use-selection';

const Page = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const title = "Drivers Balances";
  const { t } = useTranslation();

  const financialContext = useFinancials();

  const [modalState, setApproveModal] = useState<boolean>(false);
  const [driverId, setDriverId] = useState<string>("");

  const openModal = () => setApproveModal(true);
  const closeModal = () => setApproveModal(false);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const financialIds : any[] | undefined = useMemo(
    () => financialContext == undefined? undefined: financialContext?.drivers.map((driver: any) => driver.id),
    []);

  const driverSelection = useSelection(financialIds)

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const { showAlert, renderForAlert } = useAlert();

  useEffect(() => {
    financialContext?.fetchDrivers(controller.page, controller.rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleFunction = (id: string) => {
    openModal();
    setDriverId(id);
  }

  const reckoning = async () => {
    await financialContext?.restBalance(driverId);
    closeModal();
  }

  return (
    <>
      <Head>
        <title>{t(title)} | Pronto</title>
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
                <Typography variant="h4">{t(title)}</Typography>
              </Stack>
            </Stack>
            <SearchBar
              onSearchChange={handleSearch}
              placeholder={t(`Search`) + " "+ t(title)}
            />
            {(financialContext == undefined || financialContext?.count > 0) && (
              <DriverBalanceTable
                count={financialContext?.count}
                items={financialContext?.drivers}
                onPageChange={handlePageChange}
                handleFunction={handleFunction}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
              />
            )}
          </Stack>
        </Container>
      </Box>
      {renderForAlert()}
      {modalState && (
        <TransitionModal state={modalState} handleClose={() => closeModal()} >
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {t('Are you sure you want to Reckoning this driver?')}
            </Typography>
            <Button onClick={() => reckoning()}>
              {t('Reckoning')}
            </Button>
          </Box>
        </TransitionModal>
      )}
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
