import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { useFinancials } from '@/hooks/use-financials';
import { IOfficesFinancialsBalance } from '@/@types/offices-financials-balance';
import { OfficesBalanceTable } from '@/sections/financials/offices-balance-table';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import { useSelection } from '@/hooks/use-selection';
import { SearchBar } from '@/sections/shared/search-bar';

const Page = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const title = "Offices Balance";
  const { t } = useTranslation();

  const [offices, setOffices] = useState<IOfficesFinancialsBalance[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  const financialContext = useFinancials();

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const officesIds : any[] | undefined = useMemo(
    () => financialContext == undefined? undefined: financialContext?.offices.map((office: any) => office.id),
    []);

  const officeSelection = useSelection(officesIds);

  const getOffices = async() => {
    await financialContext?.fetchOffices(controller.page, controller.rowsPerPage);
  }

  useEffect(() => {
    getOffices()
  }, [])

  useEffect(() => {
    setOffices(financialContext?.offices);
    setLoading(false)
  }, [financialContext?.offices])

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
        {!loading && offices && (
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

              <OfficesBalanceTable
                count={financialContext?.count}
                items={financialContext?.offices}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                onDeselectAll={officeSelection.handleDeselectAll}
                onDeselectOne={officeSelection.handleDeselectOne}
                onSelectAll={officeSelection.handleSelectAll}
                onSelectOne={officeSelection.handleSelectOne}
                selected={officeSelection.selected}
              />
            </Stack>
          </Container>
        )}
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
