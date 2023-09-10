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
import { useSalon } from '@/hooks/use-salon';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const OverviewLatestSalonBookings = (props: any) => {
  const {  sx } = props;

  const router = useRouter();
  const {t}= useTranslation();
  const salonContext = useSalon();

  const fetchBookings= async () => {
    const queryParams: any = [
      {key: 'sort', value: '-createdAt'}
    ];
    salonContext?.fetchSalonBookings(0, 5, queryParams);
  }
  
  useEffect(() => {
    fetchBookings()
  
  }, []);

  const handleRoute = () => {
    router.push(`/orders`);
  };


  return (
    <Card sx={sx}>
      <CardHeader title={t("Latest Salon Bookings")} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Book ID')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>{t('Payment Status')}</TableCell>
                <TableCell>{t('from')}</TableCell>
                <TableCell>{t('to')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salonContext?.bookings.map((book: any) => {
                const created_at = format(Date.parse(book.date), "dd/MM/yyyy");

                return (
                  <TableRow
                    hover
                    key={book?._id}
                  >
                    <TableCell>{book._id}</TableCell>
                    <TableCell>
                      {created_at}
                    </TableCell>
                    <TableCell>
                      {t(book.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      {book.startTime}
                    </TableCell>
                    <TableCell>
                      {book.endTime}
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

OverviewLatestSalonBookings.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
