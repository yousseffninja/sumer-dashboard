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
    title: "Orders",
    path: "/orders",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Send Notifications",
    path: "/send-notifictions",
    icon: (
      <SvgIcon fontSize="small">
        <NotificationAddIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Offices",
    path: "/offices",
    icon: (
      <SvgIcon fontSize="medium">
        <LocalShippingIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Admins",
    path: "/admins",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  ,
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Users management",
    children: [
      
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Clients",
        path: "/users-management/clients",
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Drivers",
        path: "/users-management/drivers",
        icon: (
          <SvgIcon fontSize="small">
            <PeopleAltIcon />
          </SvgIcon>
        ),
      },
    ],
    icon: (
      <SvgIcon fontSize="medium">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Financials",
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    ),
    children: [
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Transactions",
        path: "/financials/transactions",
        icon: (
          <SvgIcon fontSize="small">
            <CurrencyDollarIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Offices Balance",
        path: "/financials/offices-balance",
        icon: (
          <SvgIcon fontSize="small">
            <CreditCardIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Drivers Balances",
        path: "/financials/drivers-balances",
        icon: (
          <SvgIcon fontSize="small">
            <CreditCardIcon />
          </SvgIcon>
        ),
      },
    ],
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Vehicles management",
    children: [
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Vehicles",
        path: "/vehicles-management/vehicles",
        icon: (
          <SvgIcon fontSize="small">
            <NoCrashIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Verification Requests",
        path: "/vehicles-management/verification-requests",
        icon: (
          <SvgIcon fontSize="small">
            <TaxiAlertIcon />
          </SvgIcon>
        ),
      },
    ],
    icon: (
      <SvgIcon fontSize="medium">
        <DriveEtaIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "ContactMessages",
    path: "/contact-messages",
    icon: (
      <SvgIcon fontSize="small">
        <MarkEmailUnreadIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    children: [
      {
        external: false,
        disabled: false,
        menu: false,
        title: "About",
        path: "/settings/about",
        icon: (
          <SvgIcon fontSize="small">
            <CogIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Social Links",
        path: "/settings/social-links",
        icon: (
          <SvgIcon fontSize="small">
            <CogIcon />
          </SvgIcon>
        ),
      },
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Terms and Conditions",
        path: "/settings/terms-and-conditions",
        icon: (
          <SvgIcon fontSize="small">
            <PrivacyTipIcon />
          </SvgIcon>
        ),
      },
    ],
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Application Settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    children: [
      {
        external: false,
        disabled: false,
        menu: false,
        title: "Shipping Order",
        path: "/application-settings/shipping-order",
        icon: (
          <SvgIcon fontSize="small">
            <CogIcon />
          </SvgIcon>
        ),
      },
    ],
  },
];
