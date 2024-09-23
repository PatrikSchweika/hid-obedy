import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Layout } from './Layout.tsx'
import cs from 'dayjs/locale/cs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={cs.name}>
      <Layout />
    </LocalizationProvider>
  )
}

export default App
