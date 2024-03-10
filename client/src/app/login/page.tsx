'use client'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import headerImg from "../../../public/login-signup/loginImg.jpg"
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
type LoginUser = {
    email: string,
    password: string,
}

const LoginPage = () => {
    const defaultUser = {
        email: "",
        password: ""
    }
    const [formStatus, setFormStatus] = useState<LoginUser>(defaultUser);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<LoginUser>()

    const handleLogin = async (data: any) => {
        setFormStatus((prevState) => ({
            ...prevState,
            email: data.email,
            password: data.password,
        }))
        try {
            const res = await axios.post("/auth/login", formStatus);
            const { token } = res.data;
            if (res.status === 200) {
                storeToken(token);
                authenticateUser();
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const onSubmit: SubmitHandler<LoginUser> = async (data) => {
        await handleLogin(data);
        setFormStatus(defaultUser);
    }

    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box><Image src={headerImg} alt='' width={500}></Image></Box>
            <Box sx={{ width: "50%", }}>
                <Typography variant="h2" sx={{ mb: "2rem" }}>Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-Mail"
                            defaultValue=""
                            {...register("email")}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            defaultValue=""
                            {...register("password")}
                        />
                        <Button type="submit" variant='contained' sx={{ py: "1rem" }}>Log in</Button>
                    </Box>
                </form>
                <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center", mt: "1rem", justifyContent: "center" }}>
                    <Typography>New here?</Typography>
                    <Link href="/signup">Sign up</Link>
                </Box>

            </Box>
        </Container>
    )
}

export default LoginPage;