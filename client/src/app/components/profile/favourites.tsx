import { AuthContext } from '@/app/context/AuthContext'
import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CartItem from '../CartItem'
import CartContext from '@/app/context/CartContext'
import Link from 'next/link'

export const Favourites = () => {
    const { user } = useContext(AuthContext)
    return (
        <Box>
            <Typography variant='h2'>My favourites</Typography>
            {user?.favourites ? user.favourites.map((product) => (
                <CartItem product={product} isFavourite={true} key={product._id} />
            )) : <NoFavourites />}
        </Box>
    )
}

const NoFavourites = () => {
    return (
        <Box>
            <Typography>You&#39;ve not saved any favourites!</Typography>
            <Link href="/products">View Products</Link>
        </Box>
    )
}