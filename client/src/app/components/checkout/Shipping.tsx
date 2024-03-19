import { AuthContext } from '@/app/context/AuthContext'
import { ShippingDetails } from '@/types/cart'
import { ContactFormProps } from '@/types/props'
import { Box, Button, Typography, useColorScheme } from '@mui/material'
import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Shipping = ({ handleNext, setShippingDetails, handleBack }: ContactFormProps) => {
    const { isLoggedIn } = useContext(AuthContext);
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
                    <Box>
                        {!isLoggedIn && <Button onClick={handleBack} variant="contained">Back</Button>}
                        <Button onClick={handleNext} variant="contained">Next</Button>
                    </Box>
                </Box>
            </form>

        </Box>
    )
}

export default Shipping