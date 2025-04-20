import {
    TableContainer, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, Alert
} from "@mui/material";
import { Delete, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
// Cart summary component
import CartSummary from "./Cartsummary";
import { currencyCHF } from "../../../utils/formatCurrency";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";


export default function ShoppingCartPage() {
    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();


    if (cart?.cartItems.length === 0) {
        return <Alert severity="warning">No products in your basket</Alert>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="cart table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.cartItems.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/images/${item.imageUrl}`}
                                    style={{ height: "60px" }}
                                />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{currencyCHF.format(item.price)}</TableCell>
                            <TableCell align="center">

                                <LoadingButton
                                    loading={status === "pendingAddItem" + item.productId}
                                    onClick={() => dispatch(addItemToCart({ productId: item.productId }))}

                                >
                                    <AddCircleOutline />
                                </LoadingButton>

                                <span style={{ margin: "0 8px" }}>{item.quantity}</span>

                                <LoadingButton
                                    loading={status === "pendingAddItem" + item.productId}
                                    onClick={() => dispatch(deleteItemFromCart({ productId: item.productId }))}

                                >
                                    <RemoveCircleOutline />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">
                                {currencyCHF.format(item.price * item.quantity)} CHF
                            </TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    color="error"
                                    loading={status === "pendingAddItem" + item.productId}
                                    onClick={() => { dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity })) }}
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}



                    <CartSummary />

                </TableBody>
            </Table>
        </TableContainer>
    );
}

function setLoading(arg0: { loading: boolean; id: string; }) {
    throw new Error("Function not implemented.");
}
