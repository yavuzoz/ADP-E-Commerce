import {
    CircularProgress, Divider, Stack, Table, TableBody,
    TableCell, TableContainer, TableRow, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IProduct } from '../../model/IProduct';
import requests from '../../../api/requests';
import { AddShoppingCart } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { currencyCHF } from "../../utils/formatCurrency";
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setCart } from './cart/cartSlice';

export default function ProductDetailsPage() {
    const { cart } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const item = cart?.cartItems.find(i => i.productId === product?.id);

    useEffect(() => {
        setLoading(true);
        requests.Catalog.details(Number(id))
            .then((data: IProduct) => setProduct(data))
            .catch((error: any) => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    function handleAddToCart(id: number) {
        setIsAdded(true);
        requests.Cart.addItem(id)
            .then((cart: any) => {
                dispatch(setCart(cart));
                toast.success("Product added to cart");
            })
            .catch((error: any) => console.log(error))
            .finally(() => setIsAdded(false));
    }

    if (loading) return <CircularProgress />;
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
                        loading={isAdded}
                        onClick={() => handleAddToCart(product.id)}
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
