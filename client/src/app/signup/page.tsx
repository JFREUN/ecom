'use client'
import Image from "next/image";
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import headerImg from "../../../public/login-signup/signupImg.jpg"
import { AuthContext } from "../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
type SignupUser = {
    name: string,
    email: string,
    password: string,
}
const SignupPage = () => {
    const defaultUser = {
        name: "",
        email: "",
        password: "",
    }

    const [formStatus, setFormStatus] = useState<SignupUser>(defaultUser);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<SignupUser>()

    const router = useRouter();

    const handleSignup = async (data: any) => {
        setFormStatus((prevState) => ({
            ...prevState,
            email: data.email,
            password: data.password,
        }))
        try {
            const res = await axios.post("/api/auth/signup", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                router.push("/login")
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    }

    const onSubmit: SubmitHandler<SignupUser> = async (data) => {
        console.log(data);
        await handleSignup(data);
        setFormStatus(defaultUser);
    }

    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box><Image src={headerImg} alt='' width={500}></Image></Box>
            <Box sx={{ width: "50%", }}>
                <Typography variant="h2" sx={{ mb: "2rem" }}>Signup</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue=""
                            {...register("name")}
                        />
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
                        <Button type="submit" variant='contained' sx={{ py: "1rem" }}>Sign up</Button>
                    </Box>
                </form>
                <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center", mt: "1rem", justifyContent: "center" }}>
                    <Typography>Already have an account?</Typography>
                    <Link href="/signup">Login</Link>
                </Box>

            </Box>
        </Container>
    )
}

export default SignupPage;