import { TableRow, TableCell } from "@mui/material";
import { useCartContext } from "../../../context/CartContext";

export default function CartSummary() {
    const { cart } = useCartContext();

    const subtotal = cart?.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return (
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Subtotal</TableCell>
                <TableCell align="right">{subtotal.toFixed(2)} CHF</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Tax (20%)</TableCell>
                <TableCell align="right">{tax.toFixed(2)} CHF</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}><strong>Total</strong></TableCell>
                <TableCell align="right"><strong>{total.toFixed(2)} CHF</strong></TableCell>
            </TableRow>
        </>
    );
}
