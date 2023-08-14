
export enum ResponseResult {
    success = "success",
    fail = "fail"
}

interface ErrorData {
    message: string
    code: string
}

interface BaseResponse {
    status: ResponseResult
    error?: ErrorData
}

export interface CurrencyListResponse extends BaseResponse {
    currencies: {[key: string]: string}
}

interface RateItem {
    currency_name: string
    rate: string
    rate_for_amount: string
}

export interface CurrencyRatioResponse extends BaseResponse {
    updated_date: Date
    base_currency_code: string
    base_currency_name: string
    amount: number
    rates: {[key: string]: RateItem}
}