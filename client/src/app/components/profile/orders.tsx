import { AuthContext } from '@/app/context/AuthContext';
import { Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Stripe from 'stripe';

export const Orders = () => {
    const { user } = useContext(AuthContext);
    const [charges, setCharges] = useState<Stripe.Charge[]>([]);

    useEffect(() => {
        if (user) {
            fetchCharges(user.stripeCustomerId);
        }
    }, [user]);

    const fetchCharges = async (stripeCustomerId: string) => {
        try {
            const res = await axios.get(`/api/orders/webhook/${stripeCustomerId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data: Stripe.Charge[] = await res.data;
            if (res.status == 200) {
                console.log("charges: ", data)
                setCharges(data);
            }
        } catch (error) {
            console.error('Error fetching charges:', error);
        }
    };
    return (
        <Box>
            <Typography variant='h2'>My orders</Typography>
            {charges.length > 1 ? charges.map((charge) => (
                <Typography variant='h2'> {charge.description} - {charge.amount} {charge.currency}</Typography>
            )) : <Box>
                <Typography variant='body1'>No orders yet</Typography>
            </Box>
            }
        </Box>
    )
}
