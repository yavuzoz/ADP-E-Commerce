import { useEffect, useState } from "react";
import { Container, CssBaseline, CircularProgress } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../store/store"; // Added import
import { getCart } from "../pages/catalog/cart/cartSlice";
import Header from "./Header";
import { getUser } from "../pages/account/accountSlice";


function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = async () => {
        await dispatch(getUser());
        await dispatch(getCart());

    }

    useEffect(() => {

        initApp().then(() => setLoading(false));

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
