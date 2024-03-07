import { Product } from '@/types/product';
import Image from "next/image";
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CartContext from '../context/CartContext';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

type CartItemProps = {
    key: number;
    product: Product;
}
function CartItem({ product }: CartItemProps) {
    const { removeItemFromCart, addItemToCart, deleteItemFromCart } = useContext(CartContext)
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", my: "2rem" }}>
            <Box sx={{
                width: "7rem", height: "7rem", position: "relative", borderRadius: "5px", overflow: "hidden"
            }}>
                <Image src="/home/defaultProductImg.jpg" fill={true} alt="productImg" style={{ objectFit: "cover" }} />
            </Box>
            <Box sx={{ flexGrow: 2 }}>
                <Typography variant='subtitle1'>{product.name}</Typography>
                <Typography>{product.price} €</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <ButtonGroup variant="outlined" aria-label="Small button group" size="small" color="primary">
                    <Button sx={{ color: "#9581EB" }} onClick={() => removeItemFromCart(product)}><RemoveIcon sx={{ width: "0.8rem" }} /></Button>
                    <Typography sx={{ width: "3rem", py: "0.5rem", textAlign: "center" }}>{product.quantity}</Typography>
                    <Button sx={{ color: "#9581EB" }} onClick={() => addItemToCart(product)}><AddIcon sx={{ width: "0.8rem" }} /></Button>
                </ButtonGroup>
            </Box>
            <IconButton onClick={() => deleteItemFromCart(product._id)}><DeleteOutlinedIcon></DeleteOutlinedIcon></IconButton>
        </Box >
    )
}

export default CartItem