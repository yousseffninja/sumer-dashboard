import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import TranslateIcon from "@mui/icons-material/Translate";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

export const UserDetails = (props: any) => {
  const { t } = useTranslation();
  const { user } = props;
  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const userInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value: user.phone,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
      label: t("Email"),
      value: user.email,
    },
  ];

  const addressesList = user.addresses
    ? user.addresses.map((address: any, index: number) => {
        return {
          icon: index + 1,
          label: address.area,
          value: address.street,
        };
      })
    : [];
  //mapping user.addresses to addresses list

  return (
    <div>
      <Card>
        <CardHeader subheader={"#" + user._id} title={user.name} />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <IndexedList items={userInfoList} />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      {addressesList.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title={t("Addresses")} />
          <Divider />
          <CardContent>
            <Grid container spacing={12} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={addressesList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      )}
    </div>
  );
};

UserDetails.prototype = {
  user: PropTypes.object,
};
