import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography

} from '@mui/material';
import React from 'react';
import { Scrollbar } from '../../components/scrollbar';
import { useProduct } from '@/hooks/use-product';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const OverviewLatestOrders = (props: any) => {
  const {  sx } = props;

  const router = useRouter();
  const {t}= useTranslation();
  const productContext = useProduct();


  const fetchInvoices = async () => {
    const queryParams: any = [
      {key: 'sort', value: '-createdAt'}
    ];
    productContext?.fetchInvoices(0, 5, queryParams);
  }
  
  useEffect(() => {
    fetchInvoices()
  
  }, []);

  const handleRoute = () => {
    router.push(`/orders`);
  };


  return (
    <Card sx={sx}>
      <CardHeader title={t("Latest Orders")} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Invoice ID')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>{t('Total Amount')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productContext?.invoices.map((invoice: any) => {
                const created_at = format(Date.parse(invoice.createdAt), "dd/MM/yyyy");

                return (
                  <TableRow
                    hover
                    key={invoice?._id}
                  >
                    <TableCell>{invoice.invoiceId}</TableCell>
                    <TableCell>
                      {created_at}
                    </TableCell>
                    <TableCell>
                      {invoice.totalAmount} SAR
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={()=>handleRoute()}
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          >
          {t("View all")}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
