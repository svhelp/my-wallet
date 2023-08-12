import { dateTimeReviver } from "./dateTimeReviver"

export const readDataFromStorage = <T,>(key: string) => {
    const savedDataJSON = localStorage.getItem(key)

    if (!savedDataJSON) {
        return
    }

    const savedData: T = JSON.parse(savedDataJSON, dateTimeReviver)

    return savedData
}

export const writeDataToStorage = <T,>(key: string, data: T) => {
    const dataToSave = JSON.stringify(data)
    localStorage.setItem(key, dataToSave)
}