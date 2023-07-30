import { Currency } from "./Currency"
import { Disposition } from "./Disposition"

export interface BalanceItem {
    currency: Currency
    disposition: Disposition
    amount: number
}