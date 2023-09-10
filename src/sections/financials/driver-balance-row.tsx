import { IDriverBalance } from '@/@types/driver-balance';
import {
  TableRow,
  TableCell,
  Typography,
  Stack
} from '@mui/material';
import { MenuButton } from '@/components/button-menu';

type TDriverBalanceProps = {
  drivers: IDriverBalance;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
  handleFunction: (id: string) => void;
}

export const DriverBalanceRow = ({
  drivers,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
  handleFunction
}: TDriverBalanceProps) => {
  return (
    <TableRow hover key={drivers.id}>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{drivers.account}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{drivers.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{drivers.id}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{drivers.balance}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{new Date(drivers.created_at).toLocaleDateString()}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <MenuButton
          items={[
            { label: "Reckoning", onClick: handleFunction },
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