import { User } from '../models/user.ts'
import {
  Autocomplete,
  Button,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'
import { LunchRecord } from '../models/record.ts'

interface AddLunchProps {
  users: User[]
  onAddLunch: (data: LunchRecord) => void
}

export const AddLunch = ({ users, onAddLunch }: AddLunchProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [payerId, setPayerId] = useState<number | null>(null)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Dayjs | null>(dayjs())

  const handleCheckUser = useCallback(
    (user: User) => {
      if (user.id === payerId) {
        return
      }

      if (selectedUserIds.includes(user.id)) {
        setSelectedUserIds(selectedUserIds.filter((id) => id !== user.id))
      } else {
        setSelectedUserIds([...selectedUserIds, user.id])
      }
    },
    [payerId, selectedUserIds, setSelectedUserIds],
  )

  const handleSetPayer = useCallback(
    (user: User | null) => {
      if (user) {
        setSelectedUserIds(selectedUserIds.filter((id) => id !== user.id))
      }

      setPayerId(user?.id ?? null)
    },
    [setPayerId, setSelectedUserIds, selectedUserIds],
  )

  const onSubmit = useCallback(() => {
    if (
      payerId === null ||
      selectedUserIds.length === 0 ||
      description.length === 0 ||
      date === null
    ) {
      return
    }

    const lunchFormData: LunchRecord = {
      payerId,
      selectedUserIds,
      description,
      date,
    }

    onAddLunch(lunchFormData)
    setSelectedUserIds([])
  }, [
    selectedUserIds,
    payerId,
    setSelectedUserIds,
    onAddLunch,
    date,
    description,
  ])

  return (
    <StyledPaper elevation={1}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>Přidej oběd</Typography>
        <DatePicker
          label="Datum"
          onChange={(value) => setDate(value)}
          value={date}
        />
        <TextField
          label="Popis"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option.id}
          options={users}
          onChange={(_, value) => handleSetPayer(value)}
          renderInput={(params) => (
            <TextField {...params} label="Platil" required />
          )}
        />
        <Typography>Lidé</Typography>
        <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
          {users
            .filter((user) => user.id !== payerId)
            .map((user, i) => {
              return (
                <ListItemButton
                  key={i}
                  onClick={() => handleCheckUser(user)}
                  disabled={payerId === null}
                >
                  <ListItemIcon>
                    <Checkbox checked={selectedUserIds.includes(user.id)} />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                </ListItemButton>
              )
            })}
        </List>

        <Button variant="contained" onClick={onSubmit}>
          Přidat záznam
        </Button>
      </Stack>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-width: 500px;
`
