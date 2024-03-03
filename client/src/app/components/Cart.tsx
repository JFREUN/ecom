import { Box, Divider, Drawer, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
type CartProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}
const Cart = ({ open, toggleDrawer }: CartProps) => {
    return (
        <Drawer open={open} anchor='right' onClose={() => toggleDrawer(false)}>
            <Box width={400} sx={{ p: "2rem" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h4">My cart</Typography>
                    <Box><CloseIcon /></Box>
                </Box>
                <Divider sx={{ my: "2rem" }} />
                <Box></Box>
                <Divider sx={{ my: "2rem" }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h4">Total</Typography>
                    <Typography variant="h4">0.00€</Typography>
                </Box>
            </Box>
        </Drawer>
    )
}

export default Cart