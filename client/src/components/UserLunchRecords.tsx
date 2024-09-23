import { useLunchRecords } from '../queries/use-lunch-records.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

interface UserLunchRecordsProps {
  userId: string
}

export const UserLunchRecords = ({ userId }: UserLunchRecordsProps) => {
  const lunchRecords = useLunchRecords(userId)

  return (
    <TableContainer>
      <Table sx={{ minWidth: 400 }} size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Datum</b>
            </TableCell>
            <TableCell>
              <b>Popis</b>
            </TableCell>
            <TableCell align="right">
              <b>Skóre</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lunchRecords.map(({ date, description, score }, i) => (
            <TableRow key={i}>
              <TableCell>{date.format('DD.MM.YYYY')}</TableCell>
              <TableCell>{description}</TableCell>
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
