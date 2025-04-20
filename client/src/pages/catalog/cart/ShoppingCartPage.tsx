import {
    TableContainer, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, Alert
} from "@mui/material";
import { Delete, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../../../api/requests";
import { toast } from 'react-toastify';
// Cart summary component
import CartSummary from "./Cartsummary";
import { currencyCHF } from "../../../utils/formatCurrency";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { setCart } from "./cartSlice";


export default function ShoppingCartPage() {
    const { cart } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({ loading: false, id: "" });

    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });
        requests.Cart.addItem(productId)
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));

    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
        requests.Cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

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
                                    loading={status.loading && status.id === "add" + item.productId}
                                    onClick={() => handleAddItem(item.productId, "add" + item.productId)}

                                >
                                    <AddCircleOutline />
                                </LoadingButton>

                                <span style={{ margin: "0 8px" }}>{item.quantity}</span>

                                <LoadingButton
                                    loading={status.loading && status.id === "del" + item.productId}
                                    onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}

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
                                    loading={status.loading && status.id === "del_all" + item.productId}
                                    onClick={() => {
                                        handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity)
                                        toast.error("Product removed from cart")

                                    }}

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
