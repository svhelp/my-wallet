import { Button, Container, Stack } from "@mui/material"
import { History } from "./History/History"
import { useState, useEffect } from "react"
import { CreationPanel } from "./StorypointCreation/CreationPanel"
import { Budget } from "../../domain/Budget"
import { Balance } from "../../domain/Balance"
import { budgetStorageKey } from "../../constants/storageKey"
import { readDataFromStorage, writeDataToStorage } from "../../utilities/storageProcessor"

interface DashboardProps {
    currencies: {[key: string]: string}
}

export const Dashboard = ({ currencies }: DashboardProps) => {
    const [ data, setData ] = useState<Budget>({ history: [] })
    const [ creationMode, setCreationMode ] = useState(false)

    useEffect(() => {
        const savedData = readDataFromStorage<Budget>(budgetStorageKey) ?? { history: [] }

        setData(savedData)
    }, [])

    const toggleCreationMode = () => setCreationMode(value => !value)

    const updateData = (updatedData: Budget) => {
        setData(updatedData)
        writeDataToStorage(budgetStorageKey, updatedData)
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
                {!creationMode && 
                    <Button variant="text" onClick={toggleCreationMode}>Add</Button>}
                {creationMode && <CreationPanel currencies={currencies} endCreation={toggleCreationMode} addItem={addItem} />}
                
                <History budget={data} />
            </Stack>
        </Container>
    )
}