import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { NavLink, Link } from "react-router-dom"; // Added import from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"; // Added import from "../hooks/hooks"

const links = [
    { title: "Home", to: "/" },
    { title: "Catalog", to: "/catalog" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
    { title: "Error", to: "/error" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "text.primary",
    },
    "&.active": { color: "warning.main" }
}

export default function Header() {

    const { cart } = useAppSelector((state => state.cart)); // Assuming you have a selector to get the cart state
    const itemcount = cart ? cart.cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <AppBar position="static" sx={{ mb: 4 }}>

            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <Box sx={{ display: "flex", alingItems: "center" }}>

                    <Typography variant="h6">E-commerce </Typography>
                    <Stack direction="row">
                        {
                            links.map(link =>
                                <Button key={link.to} component={NavLink} to={link.to} sx={navStyles}>{link.title}</Button>
                            )
                        }
                    </Stack>


                </Box>

                <Box>

                    <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
                        <Badge badgeContent={itemcount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>


                </Box>

            </Toolbar >

        </AppBar >
    );
}
