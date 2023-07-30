import { Button, Container, Stack } from "@mui/material"
import { History } from "./History"
import { useState } from "react"
import { StorypointCreation } from "./Storypoint/StorypointCreation"
import { Budget } from "../../domain/Budget"
import { Balance } from "../../domain/Balance"

export const Dashboard = () => {
    const [ data, setData ] = useState<Budget>({ history: [] })
    const [ creationMode, setCreationMode ] = useState(false)

    const toggleCreationMode = () => setCreationMode(value => !value)

    const addItem = (item: Balance) => {
        setData(currentState => ({
            history: [ ...currentState.history, item ].sort((x, y) => x.date > y.date ? 1 : -1)
        }))
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