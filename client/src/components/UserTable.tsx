import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { User } from '../models/user.ts'

interface UserTableProps {
  users: User[]
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table sx={{ minWidth: 400 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Jméno</TableCell>
            <TableCell align="right">Skóre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ name, score }, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">
                <b>{score}</b>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
