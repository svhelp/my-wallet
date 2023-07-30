import { Card } from "@mui/material"
import { Balance } from "../../../domain/Balance"

interface StorypointDisplayProps {
    storypoint: Balance
}

export const StorypointDisplay = ({ storypoint }: StorypointDisplayProps) => {
    return (
        <Card>
            {storypoint.items.map(item => (
                <div>
                    <span>{item.currency}</span>
                    <span>{item.amount}</span>
                </div>
            ))}
        </Card>
    )
}