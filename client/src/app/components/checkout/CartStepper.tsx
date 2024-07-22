import { AuthContext } from '@/app/context/AuthContext';
import { ShippingDetails } from '@/types/cart';
import { CartStepperProps } from '@/types/props';
import React, { useContext, useState } from 'react'
import Shipping from './Shipping';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import CartItems from './CartItems';

const CartStepper = ({ cart, cartIsLoading, clearCart }: CartStepperProps) => {
    const { isLoggedIn } = useContext(AuthContext)
    const defaultShipping: ShippingDetails = {
        street: "",
        postCode: "",
        city: "",
        country: "",
    }

    const defaultStep = isLoggedIn ? 1 : 0;
    const [activeStep, setActiveStep] = useState(defaultStep);
    const [shippingDetails, setShippingDetails] = useState(defaultShipping);

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => {
            if (prevActiveStep > 0) prevActiveStep - 1;
            return 0;
        });
    };

    const steps = [
        {
            id: 0,
            label: "My Cart",
            component: <CartItems handleNext={handleNext} handleBack={handleBack} cart={cart} cartIsLoading={cartIsLoading} clearCart={clearCart} setShippingDetails={setShippingDetails} />
        },
        {
            id: 1,
            label: "Shipping",
            component: <Shipping handleNext={handleNext} handleBack={handleBack} setShippingDetails={setShippingDetails} shippingDetails={shippingDetails} cart={cart} cartIsLoading={cartIsLoading} clearCart={clearCart} />
        },

    ]

    return (
        <Box sx={{ flexDirection: "column" }}>
            <Stepper activeStep={activeStep} >
                {steps.map(({ label }, index) => {
                    if (isLoggedIn && index === 0) return;
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Box>
                {steps[activeStep].component}
            </Box>
        </Box>
    )
}

export default CartStepper