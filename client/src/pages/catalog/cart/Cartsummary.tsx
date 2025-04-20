import { TableRow, TableCell } from "@mui/material";
import { currencyCHF } from "../../../utils/formatCurrency";
import { useAppSelector } from "../../../hooks/hooks";

export default function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);

    const subtotal = cart?.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return (
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Subtotal</TableCell>
                <TableCell align="right">{currencyCHF.format(subtotal)} CHF</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Tax (20%)</TableCell>
                <TableCell align="right">{currencyCHF.format(tax)} CHF</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}><strong>Total</strong></TableCell>
                <TableCell align="right"><strong>{currencyCHF.format(total)} CHF</strong></TableCell>
            </TableRow>
        </>
    );
}
