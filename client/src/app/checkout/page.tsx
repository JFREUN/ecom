'use client'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useContext } from 'react'
import CartContext from '../context/CartContext';
import { Product } from '@/types/product';
import CartItem from '../components/CartItem';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import visa from "../../../public/paymentMethods/visa.png"
import ideal from "../../../public/paymentMethods/ideal.png"
import masterCard from "../../../public/paymentMethods/masterCard.png"
import Image from "next/image";





const CheckoutPage = () => {
    const { cart } = useContext(CartContext);
    const calculateTotalItems = (items: Product[]) => {
        let totalItems = 0;
        items.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }

    const paymentMethods = [
        { name: "visa", icon: visa },
        { name: "ideal", icon: ideal },
        { name: "masterCard", icon: masterCard },
    ]
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%" }}>
                <Typography variant="h2">My cart</Typography>
                {cart && cart.items.length > 0 ?
                    <Box>
                        {cart?.items.map((item) => (
                            <CartItem product={item} key={item._id} />
                        ))}
                    </Box> :
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h5">Your cart is empty</Typography>
                        <Box>
                            <SentimentVeryDissatisfiedIcon />
                        </Box>
                    </Box>}
            </Box>
            <Box sx={{ width: 300, backgroundColor: "#F6EBFF", p: 4, borderRadius: "5px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}>
                    <Typography variant="h5">Estimated Total:</Typography>
                    <Typography variant="subtitle1">{cart?.bill} €</Typography>
                </Box>
                <Typography>&#40;Shipping calculated at checkout&#41;</Typography>
                <Divider sx={{ mt: "2rem" }} />
                <Box sx={{ display: "flex", width: "100%", justifyContent: "center", gap: 2, my: 2 }}>
                    {paymentMethods.map(({ name, icon }) => (
                        <Image key={name} src={icon} alt="payment-method" width={30} />
                    ))
                    }</Box>
                <Button variant='contained' sx={{ width: "100%" }}>Pay now</Button>
                <Box>

                    <Divider sx={{ my: "2rem" }} />
                    <Box sx={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                        <TextField variant='outlined' label="Voucher Code"
                            placeholder="Voucher Code" sx={{ backgroundColor: "white" }} />
                        <Button variant="outlined" >Enter</Button>
                    </Box>
                </Box>
            </Box>

        </Container >
    )
}

export default CheckoutPage