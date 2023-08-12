import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { readDataFromStorage, writeDataToStorage } from './utilities/storageProcessor';
import { currenciesStorageKey } from './constants/storageKey';
import { CachedCurrencies } from './domain/CachedCurrencies';
import { refreshThreshold } from './constants/timeout';
import { getCurrencyList } from './api/currencyApi';
import { Alert, Skeleton } from '@mui/material';

export default function App() {
  const [ loading, setLoading ] = useState(true)
  const [ currencies, setCurrencies ] = useState({})
  const [ loadingError, setLoadingError ] = useState("")

  const getData = async (): Promise<{
    data?: {[key: string]: string}
    errorMessage?: string
  }> => {
    const lastValidDate = new Date()
    lastValidDate.setDate(lastValidDate.getDate() + refreshThreshold)
  
    const savedData = readDataFromStorage<CachedCurrencies>(currenciesStorageKey)
  
    // eslint-disable-next-line no-self-compare
    if (savedData && savedData.currencies
          && (savedData.lastUpdated ?? lastValidDate < lastValidDate)) {
      return { data: savedData.currencies }
    }
    
    try {
      const currencyResponse = await getCurrencyList()

      if (currencyResponse.data.error) {
        return { errorMessage: currencyResponse.data.error.message }
      }

      writeDataToStorage(currenciesStorageKey, {
        lastUpdated: new Date(),
        currencies: currencyResponse.data.currencies
      })
      return { data: currencyResponse.data.currencies }
    } catch (e) {
      return { errorMessage: JSON.stringify(e) }
    }
  }

  const initData = async () => {
    const data = await getData()

    setLoading(false)
    setCurrencies(data.data ?? {})
    setLoadingError(data.errorMessage ?? "")
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {loading
        ? <Skeleton variant="rectangular" width={210} height={118} />
        : loadingError
          ? <Alert severity="error">{loadingError}</Alert>
          : <Dashboard currencies={currencies} />}
      
    </LocalizationProvider>
  );
}
