import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ShoppingCartPage() {

    const { cart } = userCartContext();


    if (!cart) return <h1>Cart is empty</h1>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/images/${item.imageUrl}`}
                                    style={{ height: '60px' }}
                                />

                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.price} CHF</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price * item.quantity} CHF</TableCell>
                            <TableCell align="right">

                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    );
}

function userCartContext(): { cart: any; } {
    throw new Error("Function not implemented.");
}

function setCart(cart: any): any {
    throw new Error("Function not implemented.");
}
