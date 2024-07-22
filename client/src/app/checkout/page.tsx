'use client'
import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useContext, useState } from 'react'
import CartContext from '../context/CartContext';
import { OrderTotal } from '../components/checkout/OrderTotal';
import CartStepper from '../components/checkout/CartStepper';




const CheckoutPage = () => {
    const { cart, cartIsLoading, clearCart } = useContext(CartContext);
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%" }}>
                <CartStepper cart={cart} cartIsLoading={cartIsLoading} clearCart={clearCart} />
            </Box>
            <OrderTotal cart={cart} cartIsLoading={cartIsLoading} />
        </Container >
    )
}



export default CheckoutPage