import { UserTable } from './UserTable.tsx'
import { AddLunch, AddLunchFormData } from './AddLunch.tsx'
import {
  AppBar,
  Dialog,
  Grid2 as Grid,
  Paper,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'
import { useUsers } from '../queries/use-users.ts'
import { useAddLunchRecord } from '../queries/use-add-lunch-record.ts'
import { useCallback, useState } from 'react'
import { UserLunchRecords } from './UserLunchRecords.tsx'
import { useLunchRecords } from '../queries/use-lunch-records.ts'
import { useSnackbar } from 'notistack'

export const Layout = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const users = useUsers()
  const lunchRecords = useLunchRecords()

  const addLunchRecord = useAddLunchRecord()

  const handleAddLunch = useCallback(
    (data: AddLunchFormData) => {
      addLunchRecord(data)
        .then(() => enqueueSnackbar('Oběď přidán', { variant: 'success' }))
        .catch(() =>
          enqueueSnackbar('Nepodařilo se přidat oběd', { variant: 'error' }),
        )
    },
    [addLunchRecord, enqueueSnackbar],
  )

  const handleUserClicked = useCallback(
    (userId: string) => {
      setShowDialog(true)
      setSelectedUserId(userId)
    },
    [setShowDialog, setSelectedUserId],
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant={'h4'}>
            <b>HID obědy 🍔</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledGrid container spacing={2}>
        <StyledGridItem size={{ xs: 12, sm: 6 }}>
          <StyledPaper sx={{ padding: 5 }}>
            <AddLunch users={users} onAddLunch={handleAddLunch} />
          </StyledPaper>
        </StyledGridItem>

        <StyledGridItem size={{ xs: 12, sm: 6 }}>
          <StyledPaper>
            <UserTable users={users} onUserClicked={handleUserClicked} />
          </StyledPaper>
        </StyledGridItem>
      </StyledGrid>

      <Dialog fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
        {selectedUserId && (
          <UserLunchRecords
            users={users}
            lunchRecords={lunchRecords}
            userId={selectedUserId}
          />
        )}
      </Dialog>
    </>
  )
}

const StyledGrid = styled(Grid)`
  padding-top: 40px;
`

const StyledGridItem = styled(Grid)`
  //display: flex;
`

// const Container = styled('div')`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 200px;
//   padding-top: 80px;
// `

const StyledPaper = styled(Paper)`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
`
