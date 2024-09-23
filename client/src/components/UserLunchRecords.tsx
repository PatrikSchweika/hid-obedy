import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { User } from '../models/user.ts'
import { LunchRecord } from '../models/lunch-record.ts'
import { useMemo } from 'react'

interface UserLunchRecordsProps {
  userId: string
  users: User[]
  lunchRecords: LunchRecord[]
}

export const UserLunchRecords = ({
  userId,
  users,
  lunchRecords,
}: UserLunchRecordsProps) => {
  const userLunchRecords = useMemo(() => {
    return lunchRecords
      .filter((record) => {
        return (
          record.payerId === userId || record.selectedUserIds.includes(userId)
        )
      })
      .map((record) => ({
        ...record,
        score: record.payerId === userId ? record.selectedUserIds.length : -1,
      }))
  }, [lunchRecords, userId])

  return (
    <TableContainer>
      <Table sx={{ minWidth: 400 }} size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Datum</b>
            </TableCell>
            <TableCell>
              <b>Platil</b>
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
          {userLunchRecords.map(({ date, description, score, payerId }, i) => (
            <TableRow key={i}>
              <TableCell>{date.format('DD.MM.YYYY')}</TableCell>
              <TableCell>
                {users.find((user) => user.id === payerId)?.name}
              </TableCell>
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
