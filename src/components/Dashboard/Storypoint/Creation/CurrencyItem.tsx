import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Add } from '@mui/icons-material'
import { Currency } from "../../../../domain/Currency"
import { useState } from "react"

interface CurrencyItemProps {
    saveItem: (currency: Currency, amount: number) => void
}

export const CurrencyItem = ({ saveItem }: CurrencyItemProps) => {
    const [ currency, setCurrency ] = useState<Currency>(Currency.EUR)
    const [ amount, setAmount ] = useState(0)

    const save = () => {
        saveItem(currency, amount)

        setCurrency(Currency.EUR)
        setAmount(0)
    }

    const isValid = amount > 0
    
    return (
        <Box sx={{ display: 'flex', alignItems: "center" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value as Currency)}
                    label="Currency"
                >
                    <MenuItem value={Currency.AUD}>AUD</MenuItem>
                    <MenuItem value={Currency.CAD}>CAD</MenuItem>
                    <MenuItem value={Currency.EUR}>EUR</MenuItem>
                    <MenuItem value={Currency.RSD}>RSD</MenuItem>
                    <MenuItem value={Currency.RUB}>RUB</MenuItem>
                    <MenuItem value={Currency.UAH}>UAH</MenuItem>
                    <MenuItem value={Currency.USD}>USD</MenuItem>
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