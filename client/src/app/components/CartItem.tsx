import { Product, StripeProduct } from '@/types/product';
import Image from "next/image";
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CartContext from '../context/CartContext';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CartContextType } from '@/types/context';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

type CartItemProps = {
    product: StripeProduct;
    isFavourite: boolean;
}

type CartItemButtonProps = {
    product: StripeProduct;
    cartContext: CartContextType;
}

function CartItem({ product, isFavourite }: CartItemProps) {
    const cartContext = useContext(CartContext)
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", my: "2rem" }} >
            <Image src={product.imageUrl as string} width={100} height={100} alt="productImg" style={{ objectFit: "cover" }} />
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
    const { addItemToCart } = cartContext;
    const { user, setUser } = useContext(AuthContext);
    console.log(user)
    const removeFavourite = async (productId: string) => {
        if (user && user.favourites) {
            const newUserFaves = user.favourites.filter((favourite: StripeProduct) => favourite._id !== productId);
            const updatedUser = {
                ...user,
                favourites: newUserFaves,
            };

            try {
                const res = await axios.patch(`/api/user/${user._id}`, JSON.stringify(updatedUser), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 200) {
                    setUser(updatedUser)
                    console.log("Add to favourites successful!")
                }
            } catch (error) {
                console.error("Add failed:", error);
            }
        }
    }

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={() => addItemToCart(product)}>Add to Cart</Button>
            <IconButton onClick={() => removeFavourite(product._id)}><DeleteOutlinedIcon></DeleteOutlinedIcon></IconButton>
        </Box >
    )
}

export default CartItem