import { ContactDetails, ShippingDetails } from '@/types/cart'
import { ContactFormProps } from '@/types/props'
import { Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ContactForm = ({ handleNext, setContactDetails, setShippingDetails, handleBack }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
    } = useForm<ContactDetails>()

    const onSubmit: SubmitHandler<ContactDetails> = (data) => {
        setContactDetails!(data);
        setShippingDetails!((prevState: ShippingDetails) => ({
            ...prevState,
            address1: data.address1,
            address2: data.address2,
            postCode: data.postCode,
            city: data.city,
            country: data.country,
        }))
        handleNext()
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", py: 4 }}>
                    <Typography variant="h4">Contact Details</Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            sx={{ width: "50%" }}
                            id="outlined-required"
                            label="First Name"
                            defaultValue=""
                            {...register("firstName", { required: true })}
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            id="outlined-required"
                            label="Last Name"
                            defaultValue=""
                            {...register("lastName", { required: true })}
                        />
                    </Box>

                    <TextField
                        id="outlined-required"
                        label="E-Mail"
                        defaultValue=""
                        {...register("email", { required: true })}
                    />
                    <TextField
                        id="outlined-required"
                        label="Street"
                        defaultValue=""
                        {...register("address1", { required: true })}
                    />
                    <TextField
                        id="outlined-required"
                        label="Additional address details"
                        defaultValue=""
                        {...register("address2")}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            sx={{ width: "50%" }}
                            id="outlined-required"
                            label="Postcode"
                            defaultValue=""
                            {...register("postCode", { required: true })}
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            id="outlined-required"
                            label="City"
                            defaultValue=""
                            {...register("city", { required: true })}
                        />
                    </Box>
                    <TextField
                        id="outlined-required"
                        label="Country"
                        defaultValue=""
                        {...register("country", { required: true })}
                    />
                    <Box sx={{ display: "flex", gap: 5 }}>
                        {<Button onClick={handleBack} variant="contained" sx={{ width: "50%", py: 1 }}>Back</Button>}
                        <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" sx={{ width: "50%", py: 1 }}>Next</Button>
                    </Box>                </Box>
            </form>
        </Box>
    )
}

export default ContactForm;