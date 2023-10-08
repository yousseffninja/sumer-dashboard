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
  SvgIcon,
  Menu,
  MenuItem
} from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useSalon } from "@/hooks/use-salon"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Filter } from "@/@types/filter"

export const OverviewSalons = (props: any) => {
  const { salons = [], sx } = props;
  const { t } = useTranslation();
    const router = useRouter();
    const salonContext = useSalon();

    const fetchSalons = async () => {
      const queryParams: Filter[] = [
        {key: 'sort', value: '-promotedAds'}
      ];
      salonContext?.fetchSalons(0, 5, queryParams);
    };
    
    useEffect(() => {
      fetchSalons();
    }, []);
  
    const handleRoute = () => {
      router.push(`vehicles-management/verification-requests`);
    };
  
    interface IData {
      created_at: string;
    }

    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetailsClick = () => {
    // Handle the "Details" click here
    // You can navigate to the details page or show more information as needed
    // Example: history.push('/details'); or setOpenDetailsDialog(true);
    handleClose();
  };

  return (
    <Card sx={sx}>
      <CardHeader title={t("Top Trending Salons")} />
      <List>
        {salonContext?.salons.map((salon: any, index: number) => {
          const hasDivider = index < salons.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={salon._id}
            >
              <ListItemAvatar>
                {
                  salon.salonPhoto
                    ? (
                      <Box
                        component="img"
                        src={salon.salonPhoto}
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
                primary={salon.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end" onClick={handleClick}>
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router.push(`salons/${salon?._id}`)}>{t("Details")}</MenuItem>
              </Menu>
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

OverviewSalons.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
