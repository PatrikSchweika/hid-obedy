import { UserTable } from './UserTable.tsx'
import { AddLunch } from './AddLunch.tsx'
import { Stack } from '@mui/material'
import { User } from '../models/user.ts'
import { useCallback, useState } from 'react'
import { LunchRecord } from '../models/record.ts'

const USERS: User[] = [
  { id: 0, name: 'Patrik Schweika', score: 0 },
  { id: 1, name: 'Petr Bartoš', score: 0 },
  { id: 2, name: 'Petr Sehnal', score: 0 },
]

const RECORDS: LunchRecord[] = []

export const Layout = () => {
  const [users, setUsers] = useState<User[]>(USERS)
  const [records, setRecords] = useState<LunchRecord[]>(RECORDS)

  const handleAddLunch = useCallback(
    (lunchRecord: LunchRecord) => {
      const { payerId, selectedUserIds } = lunchRecord

      const newUsers = users.map((user) => {
        if (user.id === payerId) {
          return {
            ...user,
            score: user.score + selectedUserIds.length,
          }
        } else if (selectedUserIds.includes(user.id)) {
          return {
            ...user,
            score: user.score - 1,
          }
        }

        return user
      })

      setUsers(newUsers)
      setRecords([...records, lunchRecord])
    },
    [users, setUsers, records, setRecords],
  )

  return (
    <Stack direction="row" spacing={20}>
      <AddLunch users={users} onAddLunch={handleAddLunch} />
      <UserTable users={users} />
    </Stack>
  )
}
