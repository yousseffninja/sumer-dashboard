import { IAccountBalance } from '@/@types/account-balance';
import {
  TableRow,
  TableCell,
  Typography,
  Stack
} from '@mui/material';
import { MenuButton } from '@/components/button-menu';

type TAccountBalanceRowProps = {
  accounts: IAccountBalance;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
}

export const AccountBalanceRow =({
  accounts,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
}: TAccountBalanceRowProps) => {
  return (
    <TableRow hover key={accounts.id}>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{accounts.id}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{accounts.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{accounts.order_id}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{accounts.total}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{accounts.created_at}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <MenuButton
          items={[
            // { label: "View", onClick: handleRoute },
            // { label: "Edit", onClick: handleRoute },
            // { label: "Delete", onClick: handleRoute },
            // { label: "Edit", onClick: handleRoute },
            // { label: "Delete", onClick: null },
          ]}
        />
      </TableCell>
    </TableRow>
  )
}