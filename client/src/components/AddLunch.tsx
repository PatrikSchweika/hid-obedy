import { User } from '../models/user.ts'
import {
  Autocomplete,
  Button,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'

interface AddLunchProps {
  users: User[]
  onAddLunch: (data: AddLunchFormData) => void
}

export interface AddLunchFormData {
  date: Dayjs
  description: string
  payerId: string
  selectedUserIds: string[]
}

export const AddLunch = ({ users, onAddLunch }: AddLunchProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [payerId, setPayerId] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Dayjs | null>(dayjs())
  const [showErrors, setShowErrors] = useState<boolean>(false)

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
      setShowErrors(true)
      return
    }

    const lunchFormData: AddLunchFormData = {
      payerId,
      selectedUserIds,
      description,
      date,
    }

    setDate(dayjs())
    setDescription('')
    setSelectedUserIds([])
    setPayerId(null)
    setShowErrors(false)

    onAddLunch(lunchFormData)
  }, [
    selectedUserIds,
    payerId,
    setSelectedUserIds,
    onAddLunch,
    date,
    description,
    setDate,
    setDescription,
    setPayerId,
  ])

  return (
    <Stack spacing={2}>
      <Typography variant={'h5'}>Přidej oběd</Typography>
      <DatePicker
        label="Datum"
        disableFuture
        onChange={(value) => setDate(value)}
        value={date}
      />
      <TextField
        label="Popis"
        value={description}
        error={showErrors && description.length === 0}
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
          <TextField
            {...params}
            label="Platil"
            required
            error={showErrors && !payerId}
          />
        )}
      />
      {showErrors && selectedUserIds.length === 0 ? (
        <Error>Vyber strávniky</Error>
      ) : (
        <Typography>Strávníci</Typography>
      )}
      <List dense sx={{ maxHeight: 500, overflow: 'auto' }}>
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
  )
}

const Error = styled(Typography)`
  color: red;
`
