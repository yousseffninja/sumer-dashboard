import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { usePathname } from 'next/navigation';
import {useTranslation} from 'react-i18next';

export const SideNavItem = (props: { active?: boolean; disabled: boolean; external: any; icon: any; path: any; title: any;items: any[] | undefined }) => {
  const { active = false, disabled, external, icon, path, title, items } = props;
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank',
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        onClick={handleClick}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "grey.600",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "primary.main",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "grey.200",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "primary.main",
            }),
            ...(disabled && {
              color: "grey.500",
            }),
          }}
        >
          {t(title)}
        </Box>
      </ButtonBase>
      {items != undefined && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {items.map((child, key) => {
            const active = child.path ? pathname === child.path : false;
            const secondary_linkProps = child.path
              ? external
                ? {
                    component: "a",
                    href: child.path,
                    target: "_blank",
                  }
                : {
                    component: NextLink,
                    href: child.path,
                  }
              : {};
            return (
                <ButtonBase
                  key={key}
                  sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    pl: 4,
                    pr: "16px",
                    py: "6px",
                    textAlign: "left",
                    width: "100%",
                    ...(child.active && {
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }),
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    },
                  }}
                  href="/clients"
                  {...secondary_linkProps}
                >
                  {icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: "center",
                        color: "grey.600",
                        display: "inline-flex",
                        justifyContent: "center",
                        mr: 2,
                        ...(child.active && {
                          color: "primary.main",
                        }),
                      }}
                    >
                      {child.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: "grey.200",
                      flexGrow: 1,
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: "24px",
                      whiteSpace: "nowrap",
                      ...(active && {
                        color: "primary.main",
                      }),
                      ...(disabled && {
                        color: "grey.500",
                      }),
                    }}
                  >
                    {t(child.title)}
                  </Box>
                </ButtonBase>
            );
          })}
        </Collapse>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
