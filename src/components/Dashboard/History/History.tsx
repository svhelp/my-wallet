import { Stack, Typography } from "@mui/material"
import { Budget } from "../../../domain/Budget"
import { Storypoint } from "./Storypoint"
import { CachedRatesHistory } from "../../../domain/CachedRatesHistory"

interface HistoryProps {
    budget: Budget
    targetCurrency?: string
    ratesHistory?: CachedRatesHistory
}

export const History = ({ budget, targetCurrency, ratesHistory }: HistoryProps) => {
    return (
        <Stack spacing={2}>
            {budget.history.map((item, index) => (
                <div key={index}>
                    <Typography variant="h6" component="div">
                        {item.date.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}
                    </Typography>
                    <Storypoint storypoint={item} targetCurrency={targetCurrency} ratesHistory={ratesHistory} />
                </div>
            ))}
        </Stack>
    )
}