import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    {...register("firstName", { required: "First name is required" })}
                    label="Enter firstname"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.firstName}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    {...register("lastName", { required: "Last name is required" })}
                    label="Enter lastname"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.lastName}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    {...register("phone", { required: "Phone is required" })}
                    label="Enter phone"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.phone}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    {...register("city", { required: "City is required" })}
                    label="Enter city"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.city}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    {...register("addresLine", { required: "AddressLine is required" })}
                    label="Enter addressline"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.addresLine}
                />
            </Grid>
        </Grid>
    );
}
