import { Box, Button, IconButton, List, ListItem, ListItemText, Paper } from "@mui/material"
import { Delete } from '@mui/icons-material';
import { Balance } from "../../../domain/Balance"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { BalanceItem } from "../../../domain/BalanceItem"
import { Disposition } from "../../../domain/Disposition";
import { CurrencyIcon } from "../../../ui/CurrencyIcon";
import { CurrencyItem } from "./CurrencyItem";

interface CreationPanelProps {
    currencies: { [key: string]: string }
    endCreation: () => void
    addItem: (item: Balance) => void
}

export const CreationPanel = ({currencies, addItem, endCreation}: CreationPanelProps) => {
    const [ date, setDate ] = useState<Date | null>()
    const [ items, setItems ] = useState<BalanceItem[]>([])

    const saveItem = (newCurrency: string, newAmount: number) => {
        setItems(currentState => ([
            ...currentState,
            {
                currency: newCurrency,
                amount: newAmount,
                disposition: Disposition.Cash
            }
        ]))
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

    const isValid = !!date && items.length > 0

    return (
        <Paper sx={{margin: "16px 0"}}>
            <Box sx={{ display: 'flex', flexDirection: "column", padding: "16px", gap: "16px" }}>
                <Box sx={{ display: 'flex', alignItems: "flex-start", justifyContent: "space-evenly" }}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={setDate}
                    />
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: "16px" }}>
                        <CurrencyItem currencies={currencies} saveItem={saveItem} />
                        
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
                                        <ListItemText primary={<span><CurrencyIcon>{item.currency}</CurrencyIcon>{item.amount}</span>} />
                                    </ListItem>
                                ))}
                            </List>}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="outlined" color="error" onClick={endCreation}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={save} disabled={!isValid}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
