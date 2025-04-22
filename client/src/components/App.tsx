import { useEffect, useState } from "react";
import { Container, CssBaseline, CircularProgress } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../hooks/hooks";
import Header from "./Header";
function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = async () => {
        await dispatch(getCart());
        await dispatch(getUser());
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

function getCart(): any {
    throw new Error("Function not implemented.");
}


function getUser(): any {
    throw new Error("Function not implemented.");
} 