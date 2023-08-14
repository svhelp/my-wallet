import { Alert, Box, Button, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material"
import { History } from "./History/History"
import { useState, useEffect } from "react"
import { CreationPanel } from "./StorypointCreation/CreationPanel"
import { Budget } from "../../domain/Budget"
import { Balance } from "../../domain/Balance"
import { budgetStorageKey, configStorageKey, ratesHistoryStorageKey } from "../../constants/storageKey"
import { readDataFromStorage, writeDataToStorage } from "../../utilities/storageProcessor"
import { Config } from "../../domain/Config"
import { CachedRatesHistory } from "../../domain/CachedRatesHistory"
import { CurrencyRatesHistory } from "../../domain/CurrencyRatesHistory"
import { getHistoricalCurrencyRatio } from "../../api/currencyApi"
import { ResponseResult } from "../../api/apiModels"

interface DashboardProps {
    currencies: {[key: string]: string}
}

export const Dashboard = ({ currencies }: DashboardProps) => {
    const [ data, setData ] = useState<Budget>({ history: [] })
    const [ ratesHistory, setRatesHistory ] = useState<CachedRatesHistory>()
    const [ creationMode, setCreationMode ] = useState(false)
    const [ currency, setCurrency ] = useState<string>("")

    const [ errors, setErrors ] = useState<string[]>([])

    useEffect(() => {
        const savedConfig = readDataFromStorage<Config>(configStorageKey)
        const savedData = readDataFromStorage<Budget>(budgetStorageKey) ?? { history: [] }
        const savedRatesHistory = readDataFromStorage<CachedRatesHistory>(ratesHistoryStorageKey) ?? { history: [] }

        setData(savedData)
        setCurrency(savedConfig?.targetCurrency ?? "")
        setRatesHistory(savedRatesHistory)
    }, [])

    const defaultNetworkError = "Network error"

    const loadData = async (itemToUpdate: CurrencyRatesHistory, from: string, to: string, date: Date) => {
        try {
            const serviceData = await getHistoricalCurrencyRatio(from, to, date)
    
            if (serviceData.status !== 200) {
                return serviceData.statusText ?? defaultNetworkError
            }
    
            if (serviceData.data.status === ResponseResult.fail) {
                return serviceData.data.error?.message ?? defaultNetworkError
            }
    
            itemToUpdate.rates[to] = serviceData.data.rates[to]?.rate
        }
        catch (e) {
            return JSON.stringify(e)
        }
    }

    useEffect(() => {
        //todo: add data not loaded state
        if (!currency || !ratesHistory) {
            return
        }
        
        const updatedRatesHistory = [ ...ratesHistory.history ]
        const fetchingTasks: Promise<string | undefined>[] = []

        for (const historyItem of data.history) {
            for (const currencyData of historyItem.items) {
                const savedHistoryRatesData = updatedRatesHistory.find(x =>
                    x.date.toISOString() === historyItem.date.toISOString() &&
                    x.currency === currencyData.currency)

                if (savedHistoryRatesData && savedHistoryRatesData.rates[currency]) {
                    continue
                }

                let itemToUpdate: CurrencyRatesHistory

                if (!savedHistoryRatesData) {
                    itemToUpdate = {
                        date: historyItem.date,
                        currency: currencyData.currency,
                        rates: {}
                    }
    
                    updatedRatesHistory.push(itemToUpdate)
                } else {
                    itemToUpdate = savedHistoryRatesData
                }

                itemToUpdate.rates[currency] = ""

                const fetchingTask = loadData(itemToUpdate, currencyData.currency, currency, historyItem.date)
                fetchingTasks.push(fetchingTask)
            }
        }

        if (fetchingTasks.length === 0) {
            return
        }

        Promise.all(fetchingTasks).then((results) => {
            const errors = results
                .map(x => x ?? "")
                .filter(x => !!x)

            if (errors.length > 0) {
                setErrors(errors)
                return
            }

            setRatesHistory({ history: updatedRatesHistory })
            writeDataToStorage(ratesHistoryStorageKey, { history: updatedRatesHistory })
        })

    }, [ currency, data, ratesHistory ])

    const toggleCreationMode = () => setCreationMode(value => !value)

    const updateData = (updatedData: Budget) => {
        setData(updatedData)
        writeDataToStorage(budgetStorageKey, updatedData)
    }

    const updateTargetCurrency = (currency: string) => {
        setCurrency(currency)
        writeDataToStorage(configStorageKey, { targetCurrency: currency })
    }

    const addItem = (item: Balance) => {
        const updatedData = {
            history: [ ...data.history, item ].sort((x, y) => x.date > y.date ? 1 : -1)
        }

        updateData(updatedData)
    }

    const removeItem = (item: Balance) => {
        const updatedData = {
            history: [ ...data.history.filter(x => x !== item) ]
        }
        
        updateData(updatedData)
    }

    return (
        <Stack>
            {errors.map((err, index) => <Alert key={index} severity="error">{err}</Alert>)}

            <Paper sx={{margin: "16px 0"}}>
                <Box sx={{ display: 'flex', flexDirection: "column", padding: "16px" }}>
                    <Typography variant="h4">
                        Dashboard
                    </Typography>
                    <InputLabel>Target currency</InputLabel>
                    <Select
                        sx={{width: "350px"}}
                        value={currency}
                        onChange={(event) => updateTargetCurrency(event.target.value)}
                        label="Currency"
                    >
                        <MenuItem value="">None</MenuItem>
                        {Object.entries(currencies).map(([code, name]) =>
                            <MenuItem key={code} value={code}>{name}</MenuItem>)}
                    </Select>
                </Box>
            </Paper>
            
            {creationMode && <CreationPanel currencies={currencies} endCreation={toggleCreationMode} addItem={addItem} />}
            
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <Typography variant="h4">
                    History
                </Typography>
                {!creationMode && 
                    <Button variant="text" onClick={toggleCreationMode}>Add</Button>}
            </Box>
            <History budget={data} targetCurrency={currency} ratesHistory={ratesHistory} />
        </Stack>
    )
}