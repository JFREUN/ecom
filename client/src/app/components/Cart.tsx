import { Avatar, Box, Button, Divider, Drawer, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/types/product';
import CartContext from '../context/CartContext';
import CartItem from './CartItem';
import IconButton from '@mui/material/IconButton';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

type CartProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}
const Cart = ({ open, toggleDrawer }: CartProps) => {
    const { cart } = useContext(CartContext);
    const calculateTotalItems = (items: Product[]) => {
        let totalItems = 0;
        items.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }
    return (
        <Drawer open={open} anchor='right' onClose={() => toggleDrawer(false)}>
            <Box width={600} sx={{ p: "2rem" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Typography variant="h4">My cart</Typography>
                        {cart && <Avatar sx={{ width: 25, height: 25, fontSize: "0.8rem" }}>{calculateTotalItems(cart.items)}</Avatar>}
                    </Box>
                    <IconButton onClick={() => toggleDrawer(false)}><CloseIcon /></IconButton>
                </Box>
                <Divider sx={{ my: "2rem" }} />
                <Box>
                    {cart?.items.map((item) => (
                        <CartItem product={item} key={item._id} />
                    ))}
                </Box>
                <Divider sx={{ my: "2rem" }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5">Total</Typography>
                    <Typography variant="h5">{cart?.bill} €</Typography>
                </Box>
                <Button variant='contained' sx={{ width: "100%", py: "1rem", mt: "2rem", gap: 2 }}>
                    <LocalMallOutlinedIcon />
                    <Typography>Checkout</Typography>
                </Button>
            </Box>
        </Drawer>
    )
}

export default Cart