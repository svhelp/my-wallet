export interface CurrencyRatesHistory {
    date: Date
    currency: string
    rates: {[key: string]: string}
}