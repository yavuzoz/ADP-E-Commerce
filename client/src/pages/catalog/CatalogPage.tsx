import { useState, useEffect } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";

export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]);


    useEffect(() => {
        // fetch request to get products from the server
        fetch("http://localhost:5025/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);


    return (

        <ProductList products={products} />
    );
}
