import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header(props: any) {
    return (
        <AppBar position="static">

            <Toolbar>

                <Typography variant="h6">
                    E-commerce
                </Typography>

            </Toolbar>

        </AppBar>
    );
}