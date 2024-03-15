import { Product } from '@/types/product';
import Image from "next/image";
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CartContext from '../context/CartContext';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CartContextType } from '@/types/context';

type CartItemProps = {
    product: Product;
    isFavourite: boolean;
}

type CartItemButtonProps = {
    product: Product;
    cartContext: CartContextType;
}

function CartItem({ product, isFavourite }: CartItemProps) {
    const cartContext = useContext(CartContext)
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", my: "2rem" }} >
            <Box sx={{
                width: "7rem", height: "7rem", position: "relative", borderRadius: "5px", overflow: "hidden"
            }}>
                <Image src="/home/defaultProductImg.jpg" fill={true} alt="productImg" style={{ objectFit: "cover" }} />
            </Box>
            <Box sx={{ flexGrow: 2 }}>
                <Typography variant='subtitle1'>{product.name}</Typography>
                <Typography>{product.price} €</Typography>
            </Box>
            {isFavourite ? <FavouritesButtons product={product} cartContext={cartContext} /> : <CartButtons product={product} cartContext={cartContext} />}
        </Box >
    )
}

const CartButtons = ({ product, cartContext }: CartItemButtonProps) => {
    const { removeItemFromCart, addItemToCart, deleteItemFromCart } = cartContext as CartContextType;
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonGroup variant="outlined" aria-label="Small button group" size="small" color="primary">
                <Button onClick={() => removeItemFromCart(product)}><RemoveIcon sx={{ width: "0.8rem" }} /></Button>
                <Typography sx={{ width: "3rem", py: "0.5rem", textAlign: "center" }}>{product.quantity}</Typography>
                <Button onClick={() => addItemToCart(product)}><AddIcon sx={{ width: "0.8rem" }} /></Button>
            </ButtonGroup>
            <IconButton onClick={() => deleteItemFromCart(product._id)}><DeleteOutlinedIcon></DeleteOutlinedIcon></IconButton>
        </Box>
    )
}

const FavouritesButtons = ({ product, cartContext }: CartItemButtonProps) => {
    const { deleteItemFromCart } = cartContext as CartContextType;

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained">Add to Cart</Button>
            <IconButton onClick={() => deleteItemFromCart(product._id)}><DeleteOutlinedIcon></DeleteOutlinedIcon></IconButton>
        </Box >
    )
}

export default CartItem