import {
    TableContainer, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, Alert
} from "@mui/material";
import { Delete, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../../context/CartContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../../../api/requests";

export default function ShoppingCartPage() {
    const { cart, setCart } = useCartContext();
    const [loading, setLoading] = useState(false);

    function handleAddItem(productId: number) {
        setLoading(true);
        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function handleDeleteItem(productId: number, quantity = 1) {
        setLoading(true);
        requests.Cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    if (cart?.cartItems.length === 0) {
        return <Alert severity="warning">Cart is empty</Alert>;
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
                            <TableCell align="right">{item.price} CHF</TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={loading}
                                    onClick={() => handleDeleteItem(item.productId)}

                                >
                                    <RemoveCircleOutline />
                                </LoadingButton>

                                <span style={{ margin: "0 8px" }}>{item.quantity}</span>

                                <LoadingButton
                                    loading={loading}
                                    onClick={() => handleAddItem(item.productId)}

                                >
                                    <AddCircleOutline />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">
                                {(item.price * item.quantity).toFixed(2)} CHF
                            </TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    color="error"
                                    loading={loading}
                                    onClick={() => handleDeleteItem(item.productId, item.quantity)}

                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
