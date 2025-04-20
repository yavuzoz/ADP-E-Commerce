import {
    CircularProgress, Divider, Stack, Table, TableBody,
    TableCell, TableContainer, TableRow, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AddShoppingCart } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { currencyCHF } from "../../utils/formatCurrency";
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addItemToCart } from './cart/cartSlice';
import { fetchProductById, selectProductById } from './catalogSlice';

export default function ProductDetailsPage() {
    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => selectProductById(state, Number(id)));
    const { status: loading } = useAppSelector(state => state.catalog);


    const item = cart?.cartItems.find(i => i.productId === product?.id);

    useEffect(() => {
        if (!product && id)
            dispatch(fetchProductById(parseInt(id)))

    }, [id]);


    if (loading === "pendingFetchProductById") return <CircularProgress />;
    if (!product) return <h5>Product not found</h5>;

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={5} lg={4}>
                <img
                    src={`${import.meta.env.VITE_API_URL}/images/${product.imageUrl}`}
                    alt={product.name}
                    style={{ width: "100%" }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={7} lg={8}>
                <Typography variant="h3" gutterBottom>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary" gutterBottom>
                    {currencyCHF.format(product.price)}
                </Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Stock</strong></TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack direction="row" spacing={2} alignItems="center" mt={3}>
                    <LoadingButton
                        variant="outlined"
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        loading={status === "pendingAddItem" + product.id}
                        onClick={() => dispatch(addItemToCart({ productId: product.id }))}
                    >
                        Add to Cart
                    </LoadingButton>

                    {item?.quantity! > 0 && (
                        <Typography variant="body2">
                            {item.quantity} in your cart
                        </Typography>
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
}
