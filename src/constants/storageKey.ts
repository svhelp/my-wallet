const defaultStorageKey = "WalletAppDefaultStorageKey"
const storageKey = process.env.REACT_APP_STORAGE_KEY ?? defaultStorageKey

export const budgetStorageKey = storageKey + "_budget"
export const configStorageKey = storageKey + "_config"
export const currenciesStorageKey = storageKey + "_currencies"