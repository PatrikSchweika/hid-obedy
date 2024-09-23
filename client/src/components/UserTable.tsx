import {
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
  onUserClicked: (userId: string) => void
}

export const UserTable = ({ users, onUserClicked }: UserTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 400 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Jméno</b>
            </TableCell>
            <TableCell align="right">
              <b>Skóre</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, name, score }, i) => (
            <TableRow key={i}>
              <TableCell onClick={() => onUserClicked(id)}>
                <a style={{ cursor: 'pointer' }}>{name}</a>
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
