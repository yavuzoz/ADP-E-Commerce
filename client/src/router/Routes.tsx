import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../components/App";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetailsPage from "../pages/catalog/ProductDetails";
import ErrorPage from "../pages/catalog/ErrorPage"; 
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../pages/catalog/cart/ShoppingCartPage";
import RegisterPage from "../pages/account/RegisterPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import LoginPage from "../pages/account/loginPage";
import AuthGuard from "./AuthGuard";
import OrderList from "../pages/orders/OrderList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { element: <AuthGuard />, children: [
                    { path: "checkout", element: <CheckoutPage /> },
                    { path: "orders", element: <OrderList /> },
                ] 
            },
            { path: "", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "cart", element: <ShoppingCartPage /> },
            { path: "catalog/:id", element: <ProductDetailsPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "error", element: <ErrorPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path : "*", element: <Navigate to="/not-found" />}
        ]
    }
])