import { UserTable } from './UserTable.tsx'
import { AddLunch } from './AddLunch.tsx'
import { Dialog, Paper, Stack, styled } from '@mui/material'
import { useUsers } from '../queries/use-users.ts'
import { useAddLunchRecord } from '../queries/use-add-lunch-record.ts'
import { useCallback, useState } from 'react'
import { UserLunchRecords } from './UserLunchRecords.tsx'

export const Layout = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const users = useUsers()

  const addLunchRecord = useAddLunchRecord()

  const handleUserClicked = useCallback((userId: string) => {
    setShowDialog(true)
    setSelectedUserId(userId)
  }, [])

  return (
    <Stack direction="row" spacing={20}>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        {selectedUserId && <UserLunchRecords userId={selectedUserId} />}
      </Dialog>

      <StyledPaper>
        <UserTable users={users} onUserClicked={handleUserClicked} />
      </StyledPaper>

      <StyledPaper sx={{ padding: 5 }}>
        <AddLunch users={users} onAddLunch={addLunchRecord} />
      </StyledPaper>
    </Stack>
  )
}

const StyledPaper = styled(Paper)`
  min-width: 500px;
  max-height: 90vh;
  overflow: auto;
`
