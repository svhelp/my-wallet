import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Balance } from "../../../domain/Balance"
import { CurrencyIcon } from "../../../ui/CurrencyIcon"

interface StorypointDisplayProps {
    storypoint: Balance
}

export const StorypointDisplay = ({ storypoint }: StorypointDisplayProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {storypoint.date.getDate()}
                </Typography>

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