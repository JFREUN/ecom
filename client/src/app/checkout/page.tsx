'use client'
import { Box, Button, Divider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useContext, useState } from 'react'
import CartContext from '../context/CartContext';
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
import axios from 'axios';
import { CartProps } from '@/types/props';
import { OrderTotal } from '../components/checkout/OrderTotal';
import Link from 'next/link';




const CheckoutPage = () => {
    const { cart, cartIsLoading, clearCart } = useContext(CartContext);
    const [show, setShow] = useState({
        cartItems: true,
        stepper: false,
    })
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%" }}>
                <CartItems cart={cart} setShow={setShow} cartIsLoading={cartIsLoading} clearCart={clearCart} />
            </Box>
            <OrderTotal cart={cart} cartIsLoading={cartIsLoading} />
        </Container >
    )
}

const CartItems = ({ cart, clearCart, cartIsLoading }: CartProps) => {
    const paymentMethods = [
        { name: "visa", icon: visa },
        { name: "ideal", icon: ideal },
        { name: "masterCard", icon: masterCard },
    ]

    const handleCheckout = async (e: any) => {
        e.preventDefault()
        const lineItems = cart?.items.map((item) => {
            const lineItem = {
                price: item.priceId,
                quantity: item.quantity,
            }
            return lineItem;
        })
        try {
            const { data } = await axios.post("/api/payment",
                {
                    lineItems: lineItems
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            clearCart!();
            window.location.assign(data)
            const query = new URLSearchParams(window.location.search);
            if (query.get('success')) {
                console.log('Order placed! You will receive an email confirmation.');
            }

            if (query.get('canceled')) {
                console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
            }

        } catch (error) {
            console.error("Checkout failed:", error);
        }
    }

    return (
        <Box>
            <Typography variant="h2">My cart</Typography>
            {cart?.items.length ?
                <>
                    <Box>
                        {cart?.items.map((item) => (
                            <CartItem product={item} key={item._id} isFavourite={false} />
                        ))}
                    </Box>

                    <Button variant='contained' sx={{ width: "100%" }} onClick={(e) => handleCheckout(e)}>Order now</Button>
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", gap: 2, my: 2 }}>
                        {paymentMethods.map(({ name, icon }) => (
                            <Image key={name} src={icon} alt="payment-method" width={30} />
                        ))
                        }
                    </Box>
                </> :
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h5">Your cart is empty</Typography>
                    <Box sx={{ mb: 4 }}>
                        <SentimentVeryDissatisfiedIcon />
                    </Box>
                    <Link href={"/products"}>
                        <Button variant='contained' sx={{ width: "100%" }}>Shop now</Button>
                    </Link>
                </Box>}
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