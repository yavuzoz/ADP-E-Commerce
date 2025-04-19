import { IProduct } from "../../model/IProduct";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import request from "../../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";
import { toast } from 'react-toastify';
import { currencyCHF } from "../../utils/formatCurrency";


interface Props {
    product: IProduct;
}

export default function Product({ product }: Props) {


    const [loading, setLoading] = useState(false);
    const { setCart } = useCartContext();


    function handleAddItem(productId: number) {
        setLoading(true);

        request.Cart.addItem(productId)
            .then(cart => {
                setCart(cart);
                toast.success("Product added to cart");
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }


    return (
        <Card>
            <CardMedia
                sx={{ height: 160, backgroundSize: "contain" }}
                image={`${import.meta.env.VITE_API_URL}/images/${product.imageUrl}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text.secondary">{product.name}</Typography>
                <Typography variant="body2" color="secondary">{currencyCHF.format(product.price)}</Typography>
                <CardActions>


                    <LoadingButton
                        variant="outlined"
                        size="small"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        onClick={() => handleAddItem(product.id)}
                        color="success"
                        sx={{ textTransform: "none", minWidth: 110 }} // 
                    >
                        Add to cart
                    </LoadingButton>


                    <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
                </CardActions>
            </CardContent>
        </Card >
    );
}
