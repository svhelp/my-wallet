import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Add } from '@mui/icons-material'
import { useState } from "react"

interface CurrencyItemProps {
    currencies: { [key: string]: string }
    saveItem: (currency: string, amount: number) => void
}

export const CurrencyItem = ({ currencies, saveItem }: CurrencyItemProps) => {
    const [ currency, setCurrency ] = useState<string>("")
    const [ amount, setAmount ] = useState(0)

    const save = () => {
        if (!currency) {
            return
        }
        
        saveItem(currency, amount)

        setCurrency("")
        setAmount(0)
    }

    const isValid = currency && amount > 0
    
    return (
        <Box sx={{ display: 'flex', alignItems: "center" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                    label="Currency"
                >
                    <MenuItem value="">None</MenuItem>
                    {Object.entries(currencies).map(([code, name]) =>
                        <MenuItem key={code} value={code}>{name}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                label="Amount"
                variant="standard"
                sx={{ width: '100%', maxWidth: 250 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={amount}
                onChange={event => setAmount(event.target.value as unknown as number)} />
            <IconButton size="small" onClick={save} disabled={!isValid}>
                <Add fontSize="small" />
            </IconButton>
        </Box>
    )
}