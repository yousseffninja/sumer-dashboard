import { ITransactions } from '@/@types/transcations';

import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Stack,
} from '@mui/material';
import React from 'react';
import { MenuButton } from '@/components/button-menu';

type TTransactionsRowProps = {
  transaction: ITransactions;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
}

const TransactionsRow = ({
  transaction,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
}: TTransactionsRowProps) => {
  return (
    <TableRow hover key={transaction.id}>
      <TableCell padding="checkbox">
        <Checkbox
          // checked={isSelected}
          onChange={(event) => {
            if (event.target.checked) {
              onSelectOne?.(transaction.id);
            } else {
              onDeselectOne?.(transaction.id);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{transaction.order_number}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{transaction.type}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{transaction.order_status}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{transaction.amount}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{new Date(transaction.created_at).toLocaleDateString()}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <MenuButton
          items={[
            // { label: "View", onClick: handleRoute },
            // { label: "Edit", onClick: handleRoute },
            // { label: "Delete", onClick: handleRoute },
            // { label: "Edit", onClick: null },
            { label: "Delete", onClick: null },
          ]}
        />
      </TableCell>
    </TableRow>
  );
}

export default TransactionsRow;