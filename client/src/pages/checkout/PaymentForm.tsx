import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    {...register("cardName", { required: "Card name is required" })}
                    label="Enter card name"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardName}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    {...register("cardNumber", { required: "Card number is required" })}
                    label="Enter card number"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardNumber}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField
                    {...register("cardExpireMonth", { required: "Expiry month is required" })}
                    label="Expiry month (MM)"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardExpireMonth}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField
                    {...register("cardExpireYear", { required: "Expiry year is required" })}
                    label="Expiry year (YYYY)"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardExpireYear}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    {...register("cardCvc", { required: "CVV is required" })}
                    label="Enter CVV"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardCvc}
                />
            </Grid>
        </Grid>
    );
}
