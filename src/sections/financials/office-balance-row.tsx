import { IOfficesFinancialsBalance } from '@/@types/offices-financials-balance';

import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Stack,
} from '@mui/material';
import React from 'react';

type TofficesFinancialsBalanceRowProps = {
  office: IOfficesFinancialsBalance;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
}

const OfficeBalanceRow = ({
  office,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
}: TofficesFinancialsBalanceRowProps) => {
  return (
    <TableRow hover key={office.id}>
      <TableCell padding="checkbox">
        <Checkbox
          // checked={isSelected}
          onChange={(event) => {
            if (event.target.checked) {
              onSelectOne?.(office.id);
            } else {
              onDeselectOne?.(office.id);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{office.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{office.phone}</Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{office.username}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{office.account}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{office.balance}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{new Date(office.created_at).toLocaleDateString()}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default OfficeBalanceRow;