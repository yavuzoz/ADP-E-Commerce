import { useEffect } from "react";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProducts, selectAllProducts } from "./catalogSlice";

export default function CatalogPage() {

    const products = useAppSelector(selectAllProducts);
    const { status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
            ;
    }, []);

    if (status === "pendingFetchProducts") return <CircularProgress />;

    return (

        <ProductList products={products} />
    );
}
