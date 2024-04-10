import { StripeProduct } from "@/types/product"
import { CartProps } from "@/types/props"
import { Box, Button, Divider, TextField, Typography } from "@mui/material"

export const OrderTotal = ({ cart }: CartProps) => {
    return (
        <Box sx={{ width: 300, backgroundColor: "#F6EBFF", p: 4, borderRadius: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}>
                <Typography variant="h5">Estimated Total:</Typography>
                <Typography variant="subtitle1">{cart?.bill} €</Typography>
            </Box>
            <Typography>&#40;Shipping calculated at checkout&#41;</Typography>
            <Divider sx={{ my: "2rem" }} />
            <Box>
                {cart?.items.map((item: StripeProduct) => (
                    <Box key={item._id} sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.price * item.quantity} €</Typography>
                    </Box>
                )
                )}

                <Divider sx={{ my: "2rem" }} />
                <Box sx={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                    <TextField variant='outlined' label="Voucher Code"
                        placeholder="Voucher Code" sx={{ backgroundColor: "white" }} />
                    <Button variant="outlined" >Enter</Button>
                </Box>
            </Box>
        </Box>

    )
}