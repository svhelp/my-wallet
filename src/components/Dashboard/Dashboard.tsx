import { Box, Button, Container, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material"
import { History } from "./History/History"
import { useState, useEffect } from "react"
import { CreationPanel } from "./StorypointCreation/CreationPanel"
import { Budget } from "../../domain/Budget"
import { Balance } from "../../domain/Balance"
import { budgetStorageKey, configStorageKey } from "../../constants/storageKey"
import { readDataFromStorage, writeDataToStorage } from "../../utilities/storageProcessor"
import { Config } from "../../domain/Config"

interface DashboardProps {
    currencies: {[key: string]: string}
}

export const Dashboard = ({ currencies }: DashboardProps) => {
    const [ data, setData ] = useState<Budget>({ history: [] })
    const [ creationMode, setCreationMode ] = useState(false)
    const [ currency, setCurrency ] = useState<string>("")

    useEffect(() => {
        const savedConfig = readDataFromStorage<Config>(configStorageKey)
        const savedData = readDataFromStorage<Budget>(budgetStorageKey) ?? { history: [] }

        setData(savedData)
        setCurrency(savedConfig?.targetCurrency ?? "")
    }, [])

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
        <Container maxWidth="md">
            <Stack>
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
                <History budget={data} />
            </Stack>
        </Container>
    )
}