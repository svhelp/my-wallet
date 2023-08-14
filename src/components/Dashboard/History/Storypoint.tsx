import { Box, Card, CardContent, List, ListItem, ListItemText } from "@mui/material"
import { Balance } from "../../../domain/Balance"
import { CurrencyIcon } from "../../../ui/CurrencyIcon"
import { CachedRatesHistory } from "../../../domain/CachedRatesHistory"
import { ConvertedAmount } from "./ConvertedAmount"

interface StorypointProps {
    storypoint: Balance
    targetCurrency?: string
    ratesHistory?: CachedRatesHistory
}

export const Storypoint = ({ storypoint, targetCurrency, ratesHistory }: StorypointProps) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}>
                        {storypoint.items.map((item, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                            >
                                <ListItemText primary={<span><CurrencyIcon>{item.currency}</CurrencyIcon>{item.amount}</span>} />
                            </ListItem>
                        ))}
                    </List>
                    <ConvertedAmount storypoint={storypoint} targetCurrency={targetCurrency} ratesHistory={ratesHistory} />
                </Box>
            </CardContent>
        </Card>
    )
}