import { Skeleton } from "@mui/material"
import { Balance } from "../../../domain/Balance"
import { CachedRatesHistory } from "../../../domain/CachedRatesHistory"

interface ConvertedAmountProps {
    storypoint: Balance
    targetCurrency?: string
    ratesHistory?: CachedRatesHistory
}

export const ConvertedAmount = ({ storypoint, targetCurrency, ratesHistory }: ConvertedAmountProps) => {
    if (!targetCurrency) {
        return <div>No target</div>
    }

    let convertedAmount: number | undefined = 0

    for (const item of storypoint.items) {
        const rates = ratesHistory?.history.find(x =>
            x.date === storypoint.date &&
            x.currency === item.currency)

        const rate = rates?.rates[targetCurrency]

        if (!rate) {
            convertedAmount = undefined
            break
        }

        convertedAmount += item.amount * Number.parseFloat(rate)
    }

    if (!convertedAmount) {
        return <Skeleton />
    }

    return (
        <div>{convertedAmount}</div>
    )

}