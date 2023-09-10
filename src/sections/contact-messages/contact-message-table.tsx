import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuButton } from '@/components/button-menu';
import {useTranslation} from 'react-i18next';
import { useRouter } from 'next/router';
import ContactMessageDialog from './contact-message-dialog';
import { IContactMessage } from '@/@types/contact-message';
export const ContactMessagesTable = (props: any) => {
  const router = useRouter();
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleSuspend = () => {},
    rowsPerPage,
    selected,
  } = props;

  const {t} = useTranslation();

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = items?(items.length > 0) && selected.length === items.length: false;
  const [selectedItem , setSelectedItem] = React.useState<IContactMessage>({} as IContactMessage);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead >
              <TableRow >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Email')}</TableCell>
                <TableCell>{t('Phone')}</TableCell>
                <TableCell>{t('Message')}</TableCell>
                <TableCell>{t('Title')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((contactMessage: any) => {
                const isSelected = selected.includes(contactMessage.id);
                const created_at = format(Date.parse(contactMessage.created_at), "dd/MM/yyyy");
                const deleted_at = contactMessage.deleted_at
                  ? format(Date.parse(contactMessage.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(contactMessage.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(contactMessage.id);
                };
                
                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedItem(contactMessage);
                  handleClickOpen();
                  // router.push(`/contactMessages-management/contactMessages/${contactMessage.account}`);
                };

                return (
                  <TableRow hover key={contactMessage.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) =>  {
                          if (event.target.checked) {
                            onSelectOne?.(contactMessage.id);
                          } else {
                            onDeselectOne?.(contactMessage.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={contactMessage?.avatar}>{contactMessage?.name? getInitials(contactMessage?.name):null}</Avatar>
                        <Typography variant="subtitle2">{contactMessage?.name ?contactMessage?.name: "-"}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{contactMessage?.email?contactMessage?.email:"-"}</TableCell>
                    <TableCell>{contactMessage?.phone?contactMessage?.phone:"-"}</TableCell>
                    <TableCell sx={{ textOverflow: 'ellipsis', maxWidth: '15ch', overflow: 'hidden', maxHeight:"15ch",whiteSpace: "nowrap "}} >{contactMessage.message}</TableCell>
                    <TableCell>{contactMessage?.title}</TableCell>
                    <TableCell>{created_at}</TableCell>
                    <TableCell>
                          <MenuButton 
                            items={[
                              {label: "View", onClick: handleRoute},
                            ]}
                          />
                        </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <ContactMessageDialog 
        item={selectedItem} 
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
      />
    </Card>
  );
};

ContactMessagesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleSuspend: PropTypes.func,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
