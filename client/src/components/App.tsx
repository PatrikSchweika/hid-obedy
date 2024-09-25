import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Layout } from './Layout.tsx'
import cs from 'dayjs/locale/cs'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={cs.name}>
      <SnackbarProvider maxSnack={3}>
        <Layout />
      </SnackbarProvider>
    </LocalizationProvider>
  )
}

export default App
