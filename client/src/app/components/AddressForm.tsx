import { AddressFormProps, FormProps, SignupProps } from "@/types/props"
import { Address, SignupUser, User } from "@/types/user"
import { Box, Button, TextField } from "@mui/material"
import { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

export const AddressForm = ({ handleNext, handleBack, setForm, isSignup, setOpenDialog }: AddressFormProps) => {
    const { register, handleSubmit } = useForm<SignupUser>()
    const { user, setUser } = useContext(AuthContext)
    const onSignupSubmit: SubmitHandler<SignupUser> = (data) => {
        setForm!((prevState: FormProps) => ({
            ...prevState,
            addressDetails: {
                ...prevState.addressDetails,
                street: data.street,
                address2: data.address2 ? data.address2 : "",
                city: data.city,
                postCode: data.postCode,
                country: data.country,
            }
        }))
        handleNext!()
    }
    const onAddAddressSubmit: SubmitHandler<SignupUser> = async (data) => {
        const newAddress: Address = {
            street: data.street,
            city: data.city,
            postCode: data.postCode,
            address2: data.address2,
            country: data.country,
            main: false,
        }
        const updateUser: User = {
            ...user as User,
            addresses: user?.addresses ? [...user?.addresses, newAddress] : [newAddress],
        }

        try {
            const res = await axios.patch(`/api/user/${user?._id}`, JSON.stringify(updateUser), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                setOpenDialog!(false)
                setUser(updateUser)
                console.log("User update successful!")
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const onSubmit: SubmitHandler<SignupUser> = (data) => {
        if (isSignup) onSignupSubmit(data);
        onAddAddressSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Street and House number"
                    defaultValue=""
                    {...register("street", { required: true })}
                />
                <TextField
                    id="outlined"
                    label="Optional addition, e.g. flat number"
                    defaultValue=""
                    {...register("address2")}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <TextField
                        required
                        sx={{ width: "50%" }}
                        id="outlined-required"
                        label="City"
                        defaultValue=""
                        {...register("city", { required: true })}
                    />
                    <TextField
                        sx={{ width: "50%" }}
                        required
                        id="outlined-required"
                        label="Post Code"
                        defaultValue=""
                        {...register("postCode", { required: true })}
                    />
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label="Country"
                    defaultValue=""
                    {...register("country", { required: true })}
                />
                {isSignup ?
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button type="button" variant='outlined' sx={{ py: "1rem", width: 200 }} onClick={handleBack}>Back</Button>
                        <Button type="submit" variant='contained' sx={{ py: "1rem", width: 200 }} onClick={handleSubmit(onSubmit)}>Next</Button>
                    </Box> :
                    <Button variant="contained" sx={{ p: 2 }} type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
                }

            </Box>
        </form>

    )
}