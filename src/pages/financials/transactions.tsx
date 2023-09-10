import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { SearchBar } from '@/sections/shared/search-bar';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import { TransactionsTable } from '@/sections/financials/transactions-table';
import { useFinancials } from '@/hooks/use-financials';
import { useSelection } from '@/hooks/use-selection';

const Page = () => {
  const title = "Transactions";
  const { t } = useTranslation();

  const financialContext = useFinancials();

  const financialIds : any[] | undefined = useMemo(
    () => financialContext == undefined? undefined: financialContext?.transactions.map((driver: any) => driver.id),
    []);

  const driverSelection = useSelection(financialIds);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  useEffect(() => {
    financialContext?.fetchTransactions(controller.page, controller.rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  return (
    <>
      <Head>
        <title>
          {t(title)} | Pronto
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t(title)}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <SearchBar
            onSearchChange={handleSearch}
            placeholder={t(`Search`) + " "+ t(title)}
          />
          {(financialContext == undefined || financialContext?.count > 0) && (
            <TransactionsTable
              count={financialContext?.count}
              items={financialContext?.transactions}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={controller.page}
              rowsPerPage={controller.rowsPerPage}
              onDeselectAll={driverSelection.handleDeselectAll}
              onDeselectOne={driverSelection.handleDeselectOne}
              onSelectAll={driverSelection.handleSelectAll}
              onSelectOne={driverSelection.handleSelectOne}
              selected={driverSelection.selected}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
