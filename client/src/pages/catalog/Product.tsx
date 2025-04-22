import { IProduct } from "../../model/IProduct";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyCHF } from "../../utils/formatCurrency";
import { addItemToCart } from "./cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";


interface Props {
    product: IProduct;
}

export default function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();




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
                        loading={status === "pendingAddItem" + product.id}
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        onClick={() => dispatch(addItemToCart({ productId: product.id }))}
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
