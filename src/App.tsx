import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Dashboard />
    </LocalizationProvider>
  );
}
