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
import { useConsultation } from '@/hooks/use-consultation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const OverviewLatestConsultant = (props: any) => {
  const {  sx } = props;

  const router = useRouter();
  const {t}= useTranslation();
  const consultationContext = useConsultation();

  const fetchConsultant= async () => {
    const queryParams: any = [
      {key: 'sort', value: '-createdAt'}
    ];
    consultationContext?.fetchConsultants(0, 5, queryParams);
  }
  
  useEffect(() => {
    fetchConsultant()
  
  }, []);

  const handleRoute = () => {
    router.push(`/orders`);
  };


  return (
    <Card sx={sx}>
      <CardHeader title={t("Latest Consultations consultants")} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Consultant ID')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>{t('user')}</TableCell>
                <TableCell>{t('consultant')}</TableCell>
                <TableCell>{t('status')}</TableCell>
                <TableCell>{t('title')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultationContext?.consultants.map((consultants: any) => {
                const created_at = format(Date.parse(consultants.createdAt), "dd/MM/yyyy");

                return (
                  <TableRow
                    hover
                    key={consultants?._id}
                  >
                    <TableCell>{consultants._id}</TableCell>
                    <TableCell>
                      {created_at}
                    </TableCell>
                    <TableCell>
                      {t(consultants?.user?.firstName)}
                    </TableCell>
                    <TableCell>
                    {t(consultants?.consultant?.firstName)}
                    </TableCell>
                    <TableCell>
                    <TableCell>{t(consultants.status)}</TableCell>
                    </TableCell>
                    <TableCell>
                      {consultants.title}
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

OverviewLatestConsultant.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
