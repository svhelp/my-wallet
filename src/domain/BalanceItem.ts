import { Disposition } from "./Disposition"

export interface BalanceItem {
    currency: string
    disposition: Disposition
    amount: number
}