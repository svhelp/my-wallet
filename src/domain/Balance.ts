import { BalanceItem } from "./BalanceItem";

export interface Balance {
    date: Date
    items: BalanceItem[]
}