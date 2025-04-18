import { useState, useEffect } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";
import requests from '../../../api/requests';

export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // fetch request to get products from the server
        requests.Catalog.list()
            .then(data => setProducts(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;

    return (

        <ProductList products={products} />
    );
}
