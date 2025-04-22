import { useEffect, useState } from "react";
import { Container, CssBaseline, CircularProgress } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import requests from "../../api/requests";
import { useAppDispatch } from "../hooks/hooks";
import { setCart } from "../pages/catalog/cart/cartSlice"; // Added import
import { setUser } from "../pages/account/accountSlice"; // Added import 
import Header from "./Header";
function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));

        requests.Account.getUser()
            .then(user => {
                setUser(user);
                localStorage.setItem("user", user);
            })
            .catch(error => console.log(error));

        requests.Cart.get()
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
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
    )
}

export default App