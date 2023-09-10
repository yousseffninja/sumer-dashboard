import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import AddIcon from '@mui/icons-material/Add';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { SvgIcon } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HomeIcon from '@mui/icons-material/Home';
import BuildingOfficeIcon from "@heroicons/react/24/solid/BuildingOfficeIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import CreditCardIcon from "@heroicons/react/24/solid/CreditCardIcon";
import React from "react";
import { truncate } from "fs";

export const items = [
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Users",
    path: "/users",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Products",
    path: "/products",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Salons",
    path: "/salons",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Consultations",
    path: "/consultations",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
];
