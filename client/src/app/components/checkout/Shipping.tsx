import { AuthContext } from '@/app/context/AuthContext'
import { ShippingDetails } from '@/types/cart'

import { AddAddressFormProps, ContactFormProps, UserAddressesProps } from '@/types/props'
import { Address, User } from '@/types/user'
import { Box, Button, TextField, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography, useColorScheme } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import { AddressForm } from '../AddressForm'
import CloseIcon from '@mui/icons-material/Close';


const Shipping = ({ setShippingDetails, handleBack, cart, clearCart, shippingDetails }: ContactFormProps) => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<ShippingDetails>()


    const handleCheckout = async () => {
        const lineItems = cart?.items.map((item) => {
            const lineItem = {
                price: item.priceId,
                quantity: item.quantity,
            }
            return lineItem;
        })
        const checkoutUrl = isLoggedIn ? "/api/payment/true" : "/api/payment/true";
        const orderBody = isLoggedIn ? {
            user,
            lineItems: lineItems,
            shippingInfo: JSON.stringify(shippingDetails),
        } : {
            customerEmail: user?.email,
            lineItems: lineItems,
            shippingInfo: JSON.stringify(shippingDetails),
        };

        console.log("Stringified json shipping: ", JSON.stringify(shippingDetails))
        try {
            const { data } = await axios.post(checkoutUrl, orderBody
                , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            clearCart!();
            window.location.assign(data)
            const query = new URLSearchParams(window.location.search);
            if (query.get('success')) {
                console.log('Order placed! You will receive an email confirmation.');
            }

            if (query.get('canceled')) {
                console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
            }

        } catch (error) {
            console.error("Checkout failed:", error);
        }
    }

    const onSubmit: SubmitHandler<ShippingDetails> = async (data) => {
        console.log("Form data:", data)
        setShippingDetails!((prevState: ShippingDetails) => ({
            ...prevState,
            street: data.street,
            city: data.city,
            address2: data.address2,
            country: data.country,
            postCode: data.postCode,
        }));
        await handleCheckout();
    }
    return (
        <Box >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 4 }}>
                    <Typography variant="h5">Shipping</Typography>
                    {isLoggedIn && user && <LoggedInAddresses setShippingDetails={setShippingDetails!} />}
                    {!isLoggedIn && <GuestAddress setShippingDetails={setShippingDetails!} />}
                    <Box sx={{ display: "flex", gap: 5 }}>
                        {!isLoggedIn && <Button onClick={handleBack} variant="contained" sx={{ width: "50%", py: 1 }}>Back</Button>}
                        <Button onClick={handleCheckout} variant="contained" sx={{ width: "50%", py: 1 }}>Next</Button>
                    </Box>
                </Box>
            </form>

        </Box>
    )
}
const GuestAddress = ({ setShippingDetails }: UserAddressesProps) => {
    const { register } = useForm<ShippingDetails>()

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        if (e.target.value) {
            setShippingDetails!((prevState: ShippingDetails) => ({
                ...prevState,
                [fieldName]: e.target.value
            }));
        }
    }

    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <TextField
                required
                id="outlined-required"
                label="Street and House number"
                defaultValue=""
                onChange={(e) => onChangeField(e, "street")}
            />
            <TextField
                id="outlined"
                label="Optional addition, e.g. flat number"
                defaultValue=""
                onChange={(e) => onChangeField(e, "address2")}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <TextField
                    required
                    sx={{ width: "50%" }}
                    id="outlined-required"
                    label="City"
                    defaultValue=""
                    onChange={(e) => onChangeField(e, "city")}
                />
                <TextField
                    sx={{ width: "50%" }}
                    required
                    id="outlined-required"
                    label="Post Code"
                    defaultValue=""
                    onChange={(e) => onChangeField(e, "postCode")}
                />
            </Box>
            <TextField
                required
                id="outlined-required"
                label="Country"
                defaultValue=""
                onChange={(e) => onChangeField(e, "country")}
            />
        </Box>
    )
}
const LoggedInAddresses = ({ setShippingDetails }: UserAddressesProps) => {
    const { user } = useContext(AuthContext);
    const mainAddress = user?.addresses.find((address) => address.main === true);
    const sideAddresses = user?.addresses.filter((address) => address.main === false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selected, setSelected] = useState(mainAddress);
    const isSelected = (address: Address) => { return selected === address };

    const selectAddress = (address: Address) => {
        setSelected(address);
        if (selected) {
            setShippingDetails!((prevState: ShippingDetails) => ({
                ...prevState,
                address1: selected.street,
                address2: selected.address2,
                postCode: selected.postCode,
                city: selected.city,
                country: selected.country,
            }))
        }
    }
    return (
        <>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                <Button variant="outlined" sx={{ color: "#333333", textTransform: "capitalize", textAlign: "left", p: 2, borderColor: isSelected(mainAddress as Address) ? "#9581EB" : "black" }} onClick={() => mainAddress && selectAddress(mainAddress)}>
                    <Box>
                        <Typography>{mainAddress?.street}</Typography>
                        <Typography>{mainAddress?.address2}</Typography>
                        <Typography>{mainAddress?.city} {mainAddress?.postCode}</Typography>
                        <Typography>{mainAddress?.country}</Typography>
                    </Box>
                </Button>
                {sideAddresses?.map((address, index) => (
                    <Button key={index} variant="outlined" sx={{ color: "#333333", textTransform: "capitalize", textAlign: "left", p: 2, borderColor: isSelected(address) ? "#9581EB" : "black" }} onClick={() => selectAddress(address)}>
                        <Box >
                            <Typography>{address.street}</Typography>
                            <Typography>{address.address2}</Typography>
                            <Typography>{address.city} {mainAddress?.postCode}</Typography>
                            <Typography>{address.country}</Typography>
                        </Box>
                    </Button>

                ))}
            </Box>
            <Button variant='contained' sx={{ height: 50, width: 200 }} onClick={() => setOpenDialog(true)}>Add address</Button>

            <AddAddressForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>
    )
}

const AddAddressForm = ({ openDialog, setOpenDialog }: AddAddressFormProps) => {
    return (
        <>
            <Dialog open={openDialog}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>Add a new address <IconButton onClick={() => setOpenDialog(false)}><CloseIcon /></IconButton></DialogTitle>
                <DialogContent>
                    <AddressForm setOpenDialog={setOpenDialog} isSignup={false} />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Shipping