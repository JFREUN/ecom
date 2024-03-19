import { ContactDetails } from '@/types/cart'
import { ContactFormProps } from '@/types/props'
import { Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ContactForm = ({ handleNext, setContactDetails }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
    } = useForm<ContactDetails>()

    const onSubmit: SubmitHandler<ContactDetails> = (data) => {
        setContactDetails!(data);
        handleNext()
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <Typography variant="h2">Contact Details</Typography>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                        <TextField
                            id="outlined-required"
                            label="First Name"
                            defaultValue=""
                            {...register("firstName", { required: true })}
                        />
                        <TextField
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
                            id="outlined-required"
                            label="Postcode"
                            defaultValue=""
                            {...register("postCode", { required: true })}
                        />
                        <TextField
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
                    <Button type="submit" variant='contained' sx={{ py: "1rem" }} onClick={handleSubmit(onSubmit)}>Next</Button>
                </Box>
            </form>
        </Box>
    )
}

export default ContactForm;