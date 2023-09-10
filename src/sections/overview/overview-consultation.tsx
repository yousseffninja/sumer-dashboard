import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useConsultation} from "@/hooks/use-consultation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Filter } from "@/@types/filter"

export const OverviewConsultations = (props: any) => {
  const { consultations = [], sx } = props;
  const { t } = useTranslation();
    const router = useRouter();
    const consultationContext = useConsultation();

    const fetchConsultation = async () => {
      const queryParams: Filter[] = [
        {key: 'sort', value: '-promotedAds'}
      ];
      consultationContext?.fetchConsultations(0, 5, queryParams);
    };
    
    useEffect(() => {
      fetchConsultation();
    }, []);
  
    const handleRoute = () => {
      router.push(`vehicles-management/verification-requests`);
    };
  
    interface IData {
      created_at: string;
    }

  return (
    <Card sx={sx}>
      <CardHeader title={t("Top Trending Consultations")} />
      <List>
        {consultationContext?.consultations.map((consultation: any, index: number) => {
          const hasDivider = index < consultations.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={consultation._id}
            >
              <ListItemAvatar>
                {
                  consultation?.owner?.userPhoto
                    ? (
                      <Box
                        component="img"
                        src={consultation?.owner?.userPhoto}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'grey.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={consultation?.owner?.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end', alignItems:'end' }}>
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

OverviewConsultations.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
