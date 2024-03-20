'use client'
import Image from "next/image";
import { Box, Button, Container, Pagination, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import headerImg from "../../../public/login-signup/signupImg.jpg"
import { AuthContext } from "../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SignupUser } from "@/types/user";
import theme from "@/themes/theme";
type SignupProps = {
    handleNext: () => void;
    handleBack: () => void;
    setForm: React.Dispatch<React.SetStateAction<FormProps>>;
    formStatus?: FormProps;
}

type FormProps = {
    personalDetails: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    },
    addressDetails: {
        street: string;
        city: string;
        address2?: string;
        country: string;
        postCode: string;
    }
}
const defaultFormStatus: FormProps = {
    personalDetails: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    },
    addressDetails: {
        street: "",
        city: "",
        address2: "",
        country: "",
        postCode: "",
    }
}
const SignupPage = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [formStatus, setFormStatus] = useState(defaultFormStatus)
    const { personalDetails, addressDetails } = formStatus;
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<SignupUser>()

    const router = useRouter();


    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const handleSignup = async () => {
        const newUser = {
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            email: personalDetails.email,
            password: personalDetails.password,
            street: addressDetails.street,
            city: addressDetails.city,
            address2: addressDetails.address2,
            country: addressDetails.country,
            postCode: addressDetails.postCode,
        }
        try {
            const res = await axios.post("/api/auth/signup", JSON.stringify(newUser), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                console.log("Signup successful");
                router.push("/login")
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    }

    const steps = [
        {
            id: 0,
            label: "Personal Details",
            component: <PersonalDetails handleNext={handleNext} handleBack={handleBack} setForm={setFormStatus} />
        },
        {
            id: 1,
            label: "Address",
            component: <AddressForm handleNext={handleNext} handleBack={handleBack} setForm={setFormStatus} />
        },
        {
            id: 2,
            label: "Confirm",
            component: <Recap handleNext={handleNext} handleBack={handleBack} setForm={setFormStatus} formStatus={formStatus} />
        }
    ]
    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box><Image src={headerImg} alt='' width={500}></Image></Box>
            <Box sx={{ width: "50%", }}>
                <Typography variant="h2" sx={{ mb: "2rem" }}>Signup</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map(({ label }, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <Box sx={{ my: 4 }}>
                    {steps[activeStep].component}
                </Box>
                {activeStep === 2 &&
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button type="button" variant='outlined' sx={{ py: "1rem", width: 200 }} onClick={handleBack}>
                            Back
                        </Button>
                        <Button type="button" variant='contained' sx={{ py: "1rem", width: 200 }} onClick={handleSignup}>
                            Sign up
                        </Button>
                    </Box>}
                <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center", mt: "1rem", justifyContent: "center" }}>
                    <Typography>Already have an account?</Typography>
                    <Link href="/signup">Login</Link>
                </Box>

            </Box>
        </Container>
    )
}

const PersonalDetails = ({ handleNext, handleBack, setForm }: SignupProps) => {
    const { register, handleSubmit } = useForm<SignupUser>()
    const onSubmit: SubmitHandler<SignupUser> = (data) => {
        setForm((prevState: FormProps) => ({
            ...prevState,
            personalDetails: {
                ...prevState.personalDetails,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            },
        }))
        handleNext()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <TextField
                        required
                        sx={{ width: "50%" }}
                        id="outlined-required"
                        label="First Name"
                        defaultValue=""
                        {...register("firstName", { required: true })}
                    />
                    <TextField
                        required
                        sx={{ width: "50%" }}
                        id="outlined-required"
                        label="Last Name"
                        defaultValue=""
                        {...register("lastName", { required: true })}
                    />
                </Box>

                <TextField
                    required
                    id="outlined-required"
                    label="E-Mail"
                    defaultValue=""
                    {...register("email", { required: true })}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    {...register("password", { required: true })}
                />
                <Button type="submit" variant='contained' sx={{ py: "1rem", width: 200 }} onClick={handleSubmit(onSubmit)}>Next</Button>
            </Box>
        </form>
    )
}

const AddressForm = ({ handleNext, handleBack, setForm }: SignupProps) => {
    const { register, handleSubmit } = useForm<SignupUser>()
    const onSubmit: SubmitHandler<SignupUser> = (data) => {
        setForm((prevState: FormProps) => ({
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
        handleNext()
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="button" variant='outlined' sx={{ py: "1rem", width: 200 }} onClick={handleBack}>Back</Button>
                    <Button type="submit" variant='contained' sx={{ py: "1rem", width: 200 }} onClick={handleSubmit(onSubmit)}>Next</Button>
                </Box>
            </Box>
        </form>

    )
}

const Recap = ({ handleNext, handleBack, setForm, formStatus }: SignupProps) => {
    const { personalDetails, addressDetails } = formStatus as FormProps;
    return (

        <Box sx={{ border: "black 1px solid", borderRadius: "5px", p: 4 }}>
            <Typography variant="h5">Personal Details</Typography>
            <Box sx={{ my: 2 }}>
                <Typography>{personalDetails.firstName} {personalDetails.lastName}</Typography>
                <Typography>{personalDetails.email}</Typography>
            </Box>
            <Typography variant="h5">Address</Typography>
            <Box sx={{ my: 2 }}>
                <Typography>{addressDetails.street}</Typography>
                <Typography>{addressDetails.address2}</Typography>
                <Typography>{addressDetails.city} {addressDetails.postCode}</Typography>
                <Typography>{addressDetails.country}</Typography>
            </Box>
        </Box>
    )
}
export default SignupPage;