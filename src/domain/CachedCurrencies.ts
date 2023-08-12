import { CachedDataBase } from "./CachedDataBase"

export interface CachedCurrencies extends CachedDataBase {
    currencies: {[key: string]: string}
}