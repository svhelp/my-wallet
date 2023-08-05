import { Card, CardContent, List, ListItem, ListItemText } from "@mui/material"
import { Balance } from "../../../domain/Balance"
import { CurrencyIcon } from "../../../ui/CurrencyIcon"

interface StorypointProps {
    storypoint: Balance
}

export const Storypoint = ({ storypoint }: StorypointProps) => {
    return (
        <Card>
            <CardContent>
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
            </CardContent>
        </Card>
    )
}