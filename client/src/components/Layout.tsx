import { UserTable } from './UserTable.tsx'
import { AddLunch } from './AddLunch.tsx'
import { Dialog, Paper, styled } from '@mui/material'
import { useUsers } from '../queries/use-users.ts'
import { useAddLunchRecord } from '../queries/use-add-lunch-record.ts'
import { useCallback, useState } from 'react'
import { UserLunchRecords } from './UserLunchRecords.tsx'
import { useLunchRecords } from '../queries/use-lunch-records.ts'

export const Layout = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const users = useUsers()
  const lunchRecords = useLunchRecords()

  const addLunchRecord = useAddLunchRecord()

  const handleUserClicked = useCallback((userId: string) => {
    setShowDialog(true)
    setSelectedUserId(userId)
  }, [])

  return (
    <Container>
      <Dialog fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
        {selectedUserId && (
          <UserLunchRecords
            users={users}
            lunchRecords={lunchRecords}
            userId={selectedUserId}
          />
        )}
      </Dialog>

      <StyledPaper>
        <UserTable users={users} onUserClicked={handleUserClicked} />
      </StyledPaper>

      <StyledPaper sx={{ padding: 5 }}>
        <AddLunch users={users} onAddLunch={addLunchRecord} />
      </StyledPaper>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  height: 98vh;

  //display: flex;

  //width: 100%;
  //justify-content: center;
  gap: 200px;
`

const StyledPaper = styled(Paper)`
  min-width: 500px;
  max-height: 90vh;
  overflow: auto;
`
