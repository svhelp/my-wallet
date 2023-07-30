import { Box, Button, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField } from "@mui/material"
import { Delete, Add } from '@mui/icons-material';
import { Balance } from "../../../domain/Balance"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { Currency } from "../../../domain/Currency"
import { BalanceItem } from "../../../domain/BalanceItem"
import { Disposition } from "../../../domain/Disposition";
import styled from "styled-components";

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
        <Paper>
            <Box sx={{ display: 'flex', flexDirection: "column", padding: "16px", gap: "16px" }}>
                <Box sx={{ display: 'flex', alignItems: "flex-start", justifyContent: "space-evenly" }}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={setDate}
                    />
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: "16px" }}>
                        <Box sx={{ display: 'flex', alignItems: "center" }}>
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
                                sx={{ width: '100%', maxWidth: 250 }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                value={newAmount}
                                onChange={event => setNewAmount(event.target.value as unknown as number)} />
                            <IconButton aria-label="delete" size="small" onClick={saveItem}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Box>
                        
                        {items.length > 0 &&
                            <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}>
                                {items.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                        secondaryAction={
                                            <IconButton aria-label="delete" onClick={() => removeItem(item)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={<span><BoldText>{item.currency}</BoldText>{item.amount}</span>} />
                                    </ListItem>
                                ))}
                            </List>}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="outlined" color="error" onClick={endCreation}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={save}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

const BoldText = styled.div`
    height: 40px;
    width: 40px;

    background: #e9e9e9;

    border-radius: 40px;

    padding: 4px;
    margin: 0 8px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
`