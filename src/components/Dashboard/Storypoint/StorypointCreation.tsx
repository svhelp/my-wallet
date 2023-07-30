import { Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { Delete, Add } from '@mui/icons-material';
import { Balance } from "../../../domain/Balance"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { Currency } from "../../../domain/Currency"
import { BalanceItem } from "../../../domain/BalanceItem"
import { Disposition } from "../../../domain/Disposition";

interface StorypointCreationProps {
    endCreation: () => void
    addItem: (item: Balance) => void
}

export const StorypointCreation = ({addItem, endCreation}: StorypointCreationProps) => {
    const [ date, setDate ] = useState<Date | null>()
    const [ items, setItems ] = useState<BalanceItem[]>([])

    const [ newCurrency, setNewCurrency ] = useState<Currency>(Currency.EUR)
    const [ newAmount, setNewAmount ] = useState(0)

    const saveItem = () => {
        setItems(currentState => ([
            ...currentState,
            {
                currency: newCurrency,
                amount: newAmount,
                disposition: Disposition.Cash
            }
        ]))

        setNewCurrency(Currency.EUR)
        setNewAmount(0)
    }

    const removeItem = (item: BalanceItem) => {
        setItems(currentState => ([
            ...currentState.filter(x => x !== item)
        ]))
    }

    const save = () => {
        if (!date) {
            return
        }

        addItem({ date, items })
        endCreation()
    }

    return (
        <Card>
            <Stack>
                <Stack direction="row">
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={setDate}
                    />
                    <Stack>
                        {items.map(item => (
                            <Stack direction="row">
                                <span>{item.currency}</span>
                                <span>{item.amount}</span>
                                <IconButton aria-label="delete" size="small" onClick={() => removeItem(item)}>
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Stack>
                        ))}

                        <Stack direction="row">
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    value={newCurrency}
                                    onChange={(event) => setNewCurrency(event.target.value as Currency)}
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
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                value={newAmount}
                                onChange={event => setNewAmount(event.target.value as unknown as number)} />
                            <IconButton aria-label="delete" size="small" onClick={saveItem}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
                <div>
                    <Button variant="outlined" color="error" onClick={endCreation}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={save}>
                        Save
                    </Button>
                </div>
            </Stack>
        </Card>
    )
}