import { Box, Container, Icon, Typography } from '@mui/material'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import React, { useContext } from 'react'
import CartContext from '@/app/context/CartContext';
import { OrderTotal } from '@/app/components/checkout/OrderTotal';

const SuccessPage = ({ params }: { params: { sessionId: number } }) => {
    const { cart, cartIsLoading, clearCart } = useContext(CartContext);
    if (cartIsLoading) return <div>Loading...</div>
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", textAlign: "center", py: 4, px: 2 }}>
                <CheckCircleSharpIcon sx={{ width: 70, height: 70, color: "#9581EB" }} />
                <Typography variant="subtitle1">Thank you!</Typography>
                <Typography variant="h3">Your order is confirmed</Typography>
            </Box>
            {cart && <OrderTotal cart={cart} cartIsLoading={cartIsLoading}></OrderTotal>}
        </Container >
    )
}

export default SuccessPage