import { AuthContext } from '@/app/context/AuthContext'
import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CartItem from '../CartItem'

export const Favourites = () => {
    const { user } = useContext(AuthContext)
    return (
        <Box>
            <Typography variant='h2'>My favourites</Typography>
            {user?.favourites && user.favourites.map((product) => (
                <CartItem product={product} isFavourite={true} key={product._id} />
            ))}
        </Box>
    )
}
