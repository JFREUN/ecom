import { ContactFormProps } from "@/types/props";
import { Box, Button, Typography } from "@mui/material";
import CartItem from "../CartItem";
import Link from "next/link";
import visa from "../../../../public/paymentMethods/visa.png";
import ideal from "../../../../public/paymentMethods/ideal.png";
import masterCard from "../../../../public/paymentMethods/masterCard.png";
import Image from "next/image";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';



const CartItems = ({ handleNext, cart }: ContactFormProps) => {
    const paymentMethods = [
        { name: "visa", icon: visa },
        { name: "ideal", icon: ideal },
        { name: "masterCard", icon: masterCard },
    ]

    return (
        <Box py={2}>
            <Typography variant="h2">My cart</Typography>
            {cart?.items.length ?
                <>
                    <Box>
                        {cart?.items.map((item) => (
                            <CartItem product={item} key={item._id} isFavourite={false} />
                        ))}
                    </Box>

                    <Button variant='contained' sx={{ width: "100%" }} onClick={handleNext}>Next</Button>
                    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", gap: 2, my: 2 }}>
                        {paymentMethods.map(({ name, icon }) => (
                            <Image key={name} src={icon} alt="payment-method" width={30} />
                        ))
                        }
                    </Box>
                </> :
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h5">Your cart is empty</Typography>
                    <Box sx={{ mb: 4 }}>
                        <SentimentVeryDissatisfiedIcon />
                    </Box>
                    <Link href={"/products"}>
                        <Button variant='contained' sx={{ width: "100%" }}>Shop now</Button>
                    </Link>
                </Box>}
        </Box>
    )
}

export default CartItems;