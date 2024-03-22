import { ContactFormProps } from '@/types/props'
import Button from '@mui/material/Button'
import React from 'react'

const Payment = ({ handleNext, setShippingDetails, handleBack }: ContactFormProps) => {
    return (
        <>
            <div>Payment</div>
            <Button onClick={handleBack}>Back</Button>
        </>
    )
}

export default Payment