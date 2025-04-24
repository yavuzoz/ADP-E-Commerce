import {
    Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../model/IOrder";
import requests from "../../../api/requests";
import { currencyCHF } from "../../utils/formatCurrency";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const orderStatus = ["Pending", "Approved", "PaymentFailed", "Completed"];

export default function OrderList() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [open, setOpen] = useState(false);

    const subTotal = selectedOrder?.orderItems.reduce((total, item) => total + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    function handleDialogOpen(order: Order) {
        setOpen(true);
        setSelectedOrder(order);
    }

    function handleDialogClose() {
        setOpen(false);
        setSelectedOrder(null);
    }

    useEffect(() => {
        setLoading(true);
        requests.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                                <TableCell>{currencyCHF.format(order.subTotal)}</TableCell>
                                <TableCell sx={{ width: 100 }}>
                                    <Button
                                        onClick={() => handleDialogOpen(order)}
                                        size="small"
                                        variant="contained"
                                        endIcon={<ArrowRightIcon />}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg">
                <DialogTitle>
                    Order No: #{selectedOrder?.id}
                </DialogTitle>
                <IconButton onClick={handleDialogClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>Shipping Information</Typography>
                        <Typography gutterBottom>{selectedOrder?.firstName} {selectedOrder?.lastName}</Typography>
                        <Typography gutterBottom>{selectedOrder?.phone}</Typography>
                        <Typography gutterBottom>{selectedOrder?.addresLine} / {selectedOrder?.city}</Typography>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/images/${item.productImage}`}
                                                alt={item.productName}
                                                style={{ height: 60 }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell align="right">{currencyCHF.format(item.price)}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{currencyCHF.format(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Subtotal</TableCell>
                                    <TableCell align="right">{currencyCHF.format(subTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Tax</TableCell>
                                    <TableCell align="right">{currencyCHF.format(tax)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Total</TableCell>
                                    <TableCell align="right">{currencyCHF.format(total)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
