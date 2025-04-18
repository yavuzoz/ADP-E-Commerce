import { CircularProgress, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IProduct } from '../../model/IProduct';
import requests from '../../../api/requests';

export default function ProductDetailsPage() {
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        requests.Catalog.details(Number(id))
            .then((data) => setProduct(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

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
                    {(product.price / 100).toFixed(2)} CHF
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
            </Grid>
        </Grid>
    );
}
