import { useEffect } from "react";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchProducts } from "./catalogSlice";

export default function CatalogPage() {

    const products = useAppSelector(state => state.catalog.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts);
    }, []);

    if (loading) return <CircularProgress />;

    return (

        <ProductList products={products} />
    );
}
