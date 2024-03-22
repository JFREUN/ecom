'use client'
import { Box, Button, Divider, Step, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useContext, useState } from 'react'
import CartContext from '../context/CartContext';
import { Product } from '@/types/product';
import CartItem from '../components/CartItem';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import visa from "../../../public/paymentMethods/visa.png"
import ideal from "../../../public/paymentMethods/ideal.png"
import masterCard from "../../../public/paymentMethods/masterCard.png"
import Image from "next/image";
import { Cart, ContactDetails, ShippingDetails } from '@/types/cart';
import ContactForm from '../components/checkout/ContactForm';
import Shipping from '../components/checkout/Shipping';
import { AuthContext } from '../context/AuthContext';
import Payment from '../components/checkout/Payment';

type CartProps = {
    cart: Cart | null;
    cartIsLoading: boolean;
    setShow?: (state: {
        cartItems: boolean,
        stepper: boolean,
    }) => void;
}


const CheckoutPage = () => {
    const { cart, cartIsLoading } = useContext(CartContext);
    const [show, setShow] = useState({
        cartItems: true,
        stepper: false,
    })

    const calculateTotalItems = (items: Product[]) => {
        let totalItems = 0;
        items.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }


    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%" }}>
                {show.cartItems && <CartItems cart={cart} setShow={setShow} cartIsLoading={cartIsLoading} />}
                {show.stepper && <CartStepper setShow={setShow} />}
            </Box>
            <OrderTotal cart={cart} cartIsLoading={cartIsLoading} />
        </Container >
    )
}

const CartItems = ({ cart, setShow, cartIsLoading }: CartProps) => {
    const paymentMethods = [
        { name: "visa", icon: visa },
        { name: "ideal", icon: ideal },
        { name: "masterCard", icon: masterCard },
    ]
    if (cartIsLoading) return <div>Loading....</div>
    return (
        <Box sx={{ width: "50%" }}>
            <Typography variant="h2">My cart</Typography>
            {cart && cart.items.length > 0 ?
                <Box>
                    {cart?.items.map((item) => (
                        <CartItem product={item} key={item._id} isFavourite={false} />
                    ))}
                </Box> :
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5">Your cart is empty</Typography>
                    <Box>
                        <SentimentVeryDissatisfiedIcon />
                    </Box>
                </Box>}

            <Button variant='contained' sx={{ width: "100%" }} onClick={() => setShow!({ cartItems: false, stepper: true })}>Order now</Button>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", gap: 2, my: 2 }}>
                {paymentMethods.map(({ name, icon }) => (
                    <Image key={name} src={icon} alt="payment-method" width={30} />
                ))
                }
            </Box>
        </Box>
    )
}

const OrderTotal = ({ cart }: CartProps) => {
    return (
        <Box sx={{ width: 300, backgroundColor: "#F6EBFF", p: 4, borderRadius: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}>
                <Typography variant="h5">Estimated Total:</Typography>
                <Typography variant="subtitle1">{cart?.bill} €</Typography>
            </Box>
            <Typography>&#40;Shipping calculated at checkout&#41;</Typography>
            <Divider sx={{ mt: "2rem" }} />

            <Box>

                <Divider sx={{ my: "2rem" }} />
                <Box sx={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                    <TextField variant='outlined' label="Voucher Code"
                        placeholder="Voucher Code" sx={{ backgroundColor: "white" }} />
                    <Button variant="outlined" >Enter</Button>
                </Box>
            </Box>
        </Box>

    )
}

type CartStepperProps = {
    setShow: React.Dispatch<React.SetStateAction<{
        cartItems: boolean;
        stepper: boolean;
    }>>;
}
const CartStepper = ({ setShow }: CartStepperProps) => {
    const { user, isLoggedIn } = useContext(AuthContext)
    const defaultContact: ContactDetails = {
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        email: user ? user.email : "",
        address1: "",
        address2: "",
        postCode: "",
        city: "",
        country: "",
    }
    const defaultShipping: ShippingDetails = {
        address1: "",
        address2: "",
        postCode: "",
        city: "",
        country: "",
        type: "regular",
    }

    const defaultStep = isLoggedIn ? 1 : 0;
    const [activeStep, setActiveStep] = useState(defaultStep);
    const [contactDetails, setContactDetails] = useState(defaultContact);
    const [shippingDetails, setShippingDetails] = useState(defaultShipping);
    const [paymentDetails, setPaymentDetails] = useState();

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => {
            if (prevActiveStep === 0) {
                setShow({ cartItems: true, stepper: false })
                return 0;
            }
            return prevActiveStep - 1
        });
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    console.log("activeStep", activeStep)

    const steps = [
        {
            id: 0,
            label: "Contact Details",
            component: <ContactForm handleNext={handleNext} handleBack={handleBack} setContactDetails={setContactDetails} setShippingDetails={setShippingDetails} />
        },
        {
            id: 1,
            label: "Shipping",
            component: <Shipping handleNext={handleNext} handleBack={handleBack} setShippingDetails={setShippingDetails} />
        },
        {
            id: 2,
            label: "Payment",
            component: <Payment handleNext={handleNext} handleBack={handleBack} setShippingDetails={setShippingDetails} />
        }
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


export default CheckoutPage