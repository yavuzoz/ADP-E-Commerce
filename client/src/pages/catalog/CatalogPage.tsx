import { useState, useEffect } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";

export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // fetch request to get products from the server
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;

    return (

        <ProductList products={products} />
    );
}
