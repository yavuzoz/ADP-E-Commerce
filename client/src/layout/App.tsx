import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, CircularProgress } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import requests from "../../api/requests";
import { useAppDispatch } from "../hooks/hooks";
import { setCart } from "../pages/catalog/cart/cartSlice"; // Added import

function App() {

    const distpatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requests.Cart.get()
            .then(cart => distpatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <CssBaseline />
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}

export default App
