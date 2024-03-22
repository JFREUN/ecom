import { AuthContext } from '@/app/context/AuthContext'
import { ShippingDetails } from '@/types/cart'
import { ContactFormProps } from '@/types/props'
import { Address, User } from '@/types/user'
import { Box, Button, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography, useColorScheme } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import { AddressForm } from '../AddressForm'
import CloseIcon from '@mui/icons-material/Close';
type UserAddressesProps = {
    setShippingDetails: React.Dispatch<React.SetStateAction<ShippingDetails>>;
}

const Shipping = ({ handleNext, setShippingDetails, handleBack }: ContactFormProps) => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm<ShippingDetails>()

    const onSubmit: SubmitHandler<ShippingDetails> = (data) => {
        console.log("Form data:", data)
        setShippingDetails!((prevState: ShippingDetails) => ({ ...prevState, type: data.type }));
        handleNext()
    }
    return (
        <Box >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 4 }}>
                    <Typography variant="h5">Shipping</Typography>
                    {isLoggedIn && user && <LoggedInAddresses setShippingDetails={setShippingDetails!} />}
                    <Box sx={{ border: "grey 1px solid", p: 2, borderRadius: "5px" }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Select Shipping</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="regular"
                                {...register("type", { required: true })}
                            >
                                <FormControlLabel value={"regular"} control={<Radio {...register("type", { required: true })} />} label="Regular - within 5 days - 1.25 €" />
                                <FormControlLabel value={"express"} control={<Radio {...register("type", { required: true })} />} label="Express - within 48 hrs - 4.95 €" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", gap: 5 }}>
                        {!isLoggedIn && <Button onClick={handleBack} variant="contained" sx={{ width: "50%", py: 1 }}>Back</Button>}
                        <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" sx={{ width: "50%", py: 1 }}>Next</Button>
                    </Box>
                </Box>
            </form>

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
type AddAddressFormProps = {
    openDialog: boolean;
    setOpenDialog: (state: boolean) => void;
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