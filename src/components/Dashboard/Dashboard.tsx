import { Button, Container, Stack } from "@mui/material"
import { History } from "./History"
import { useState, useEffect } from "react"
import { StorypointCreation } from "./Storypoint/StorypointCreation"
import { Budget } from "../../domain/Budget"
import { Balance } from "../../domain/Balance"
import { dateTimeReviver } from "../../utilities/dateTimeReviver"

const storageKey = "MyWalletData_1337"

export const Dashboard = () => {
    const [ data, setData ] = useState<Budget>({ history: [] })
    const [ creationMode, setCreationMode ] = useState(false)

    useEffect(() => {
        const savedDataJSON = localStorage.getItem(storageKey)

        if (!savedDataJSON) {
            return
        }

        const savedData: Budget = JSON.parse(savedDataJSON, dateTimeReviver)

        setData(savedData)
    }, [])

    const saveDataToStorage = (updatedData: Budget) => {
        const dataToSave = JSON.stringify(updatedData)
        localStorage.setItem(storageKey, dataToSave)
    }

    const toggleCreationMode = () => setCreationMode(value => !value)

    const updateData = (updatedData: Budget) => {
        setData(updatedData)
        saveDataToStorage(updatedData)
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
                {creationMode && <StorypointCreation endCreation={toggleCreationMode} addItem={addItem} />}
                
                <History budget={data} />
            </Stack>
        </Container>
    )
}