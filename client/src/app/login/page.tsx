'use client'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import headerImg from "../../../public/login-signup/loginImg.jpg"
import { SubmitHandler, useForm } from 'react-hook-form';
type LoginUser = {
    email: string,
    password: string,
}
const defaultUser = {
    email: "",
    password: ""
}
const LoginPage = () => {
    const [formStatus, setFormStatus] = useState<LoginUser>(defaultUser);

    const {
        register,
        handleSubmit,
    } = useForm<LoginUser>()

    const onSubmit: SubmitHandler<LoginUser> = () => {

    }

    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box><Image src={headerImg} alt='' width={500}></Image></Box>
            <Box sx={{ width: "50%", }}>
                <Typography variant="h2" sx={{ mb: "2rem" }}>Login</Typography>
                <form action="">
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-Mail"
                            defaultValue=""
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            defaultValue=""
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