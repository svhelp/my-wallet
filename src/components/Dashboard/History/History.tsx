import { Stack, Typography } from "@mui/material"
import { Budget } from "../../../domain/Budget"
import { Storypoint } from "./Storypoint"

interface HistoryProps {
    budget: Budget
}

export const History = ({ budget }: HistoryProps) => {
    return (
        <Stack spacing={2}>
            {budget.history.map((item, index) => (
                <div key={index}>
                    <Typography variant="h6" component="div">
                        {item.date.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}
                    </Typography>
                    <Storypoint storypoint={item} />
                </div>
            ))}
        </Stack>
    )
}