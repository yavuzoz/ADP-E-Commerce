import { Box, Button, Paper, Stack, Step, StepLabel, Stepper, Typography, Grid } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../../api/requests";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "@/pages/catalog/cart/cartSlice";

const steps = ["Shipping Information", "Payment", "Order Summary"];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();
    const [orderId, setOrderId] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function handleNext(data: FieldValues) {
        console.log("Form Data:", data);
        if (activeStep === 2) {
            setLoading(true);
            try {
                const orderData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    city: data.city,
                    addresLine: data.addresLine,
                    cardName: data.cardName,
                    cardNumber: data.cardNumber,
                    cardExpireMonth: data.cardExpireMonth,
                    cardExpireYear: data.cardExpireYear,
                    cardCvc: data.cardCvc
                };

                setOrderId(await requests.Order.createOrder(orderData));
                setActiveStep(activeStep + 1);
                dispatch(clearCart());
                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setLoading(false);
            }
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid container spacing={4}>
                    {activeStep !== steps.length && (
                        <Grid item xs={12} md={4} sx={{
                            borderRight: "1px solid",
                            borderColor: "divider",
                            p: 3
                        }}>
                            <Info />
                        </Grid>
                    )}
                    <Grid item xs={12} md={8} sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === steps.length ? (
                                <Stack spacing={2}>
                                    <Typography variant="h1">📦</Typography>
                                    <Typography variant="h5">Thank you! Your order has been received</Typography>
                                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                        Your order number is <strong>{orderId}</strong>. We will send you a confirmation email once it’s approved.
                                    </Typography>
                                    <Button
                                        sx={{
                                            alignSelf: "start",
                                            width: { xs: "100%", sm: "auto" }
                                        }}
                                        variant="contained"
                                    >
                                        View Orders
                                    </Button>
                                </Stack>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box mt={2}>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: activeStep !== 0 ? "space-between" : "flex-end"
                                        }}>
                                            {activeStep !== 0 && (
                                                <Button
                                                    startIcon={<ChevronLeftRounded />}
                                                    variant="contained"
                                                    onClick={handlePrevious}
                                                >
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                type="submit"
                                                loading={loading}
                                                startIcon={<ChevronRightRounded />}
                                                variant="contained"
                                            >
                                                {activeStep === 2 ? "Complete the order" : "Continue"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </FormProvider>
    );
}
