import { Stack } from "@mui/material"
import { Budget } from "../../domain/Budget"
import { StorypointDisplay } from "./Storypoint/StorypointDisplay"

interface HistoryProps {
    budget: Budget
}

export const History = ({ budget }: HistoryProps) => {
    return (
        <Stack>
            {budget.history.map(item => <StorypointDisplay item={item} />)}
        </Stack>
    )
}