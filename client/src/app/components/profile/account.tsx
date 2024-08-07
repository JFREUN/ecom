import { Box, Button, Icon, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginUser, User } from '@/types/user';
import axios from 'axios';


export const Account = () => {
    const { user, setUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<User>()

    const handleUpdateUser = async (data: any) => {
        const updateUser: User = {
            _id: user?._id || " ",
            stripeCustomerId: user?.stripeCustomerId || "",
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            addresses: data.addresses,
            favourites: user?.favourites || [],
        }
        try {
            const res = await axios.patch(`/api/user/${user?._id}`, JSON.stringify(updateUser), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                setUser(updateUser)
                console.log("User update successful!")
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const onSubmit: SubmitHandler<User> = async (data) => {
        await handleUpdateUser(data);
    }
    return (
        <Box sx={{ width: 400 }}>
            <Typography variant='h2'>My account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Icon sx={{ backgroundColor: "#CDBEF6", color: "white", borderRadius: "50%", p: 1, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PersonOutlinedIcon />
                        </Icon>
                        <Button>Update</Button>
                    </Box>
                    <TextField placeholder="First Name" label="First Name" defaultValue={user?.firstName}
                        {...register("firstName")} />
                    <TextField placeholder="Last Name" label="Last Name" defaultValue={user?.lastName}
                        {...register("lastName")} />
                    <TextField placeholder="Email" label="Email" defaultValue={user?.email}
                        {...register("email")} />
                    <Button variant='contained' sx={{ mt: 2 }} onClick={handleSubmit(onSubmit)}>Submit Changes</Button>
                </Box>
            </form>
        </Box>
    )
}
