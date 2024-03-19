import { ShippingDetails } from '@/types/cart'
import { ContactFormProps } from '@/types/props'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Shipping = ({ handleNext, setShippingDetails }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
    } = useForm<ShippingDetails>()

    const onSubmit: SubmitHandler<ShippingDetails> = (data) => {
        setShippingDetails!(data);
        handleNext()
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <Typography variant="h2">Shipping</Typography>
                </Box>
            </form>
        </Box>
    )
}

export default Shipping