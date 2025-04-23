import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { currencyCHF } from "@/utils/formatCurrency";

export default function Info()
{
    const {cart} = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;

    return (
        <>
            <Typography variant="subtitle2" sx={{color: "text.secondary"}}>Total</Typography>
            <Typography variant="h5" gutterBottom>
                {currencyCHF.format(subTotal)}
            </Typography>
            <List>
                {cart?.cartItems.map((item) => (
                    <ListItem key={item.productId} sx={{py: 1, px: 0}}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={`http://localhost:5025/images/${item.imageUrl}`}></Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{mr: 2}} primary={item.name.substring(0,15) + "..."} secondary={`x ${item.quantity}`} />
                        <Typography variant="body1">
                            {currencyCHF.format(item.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
}