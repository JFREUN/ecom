'use client'

import { Box, Button, Container, Divider, Typography } from '@mui/material'
import Image from "next/image";
import useSWR from 'swr';
import StarIcon from '@mui/icons-material/Star';
import { publicFetcher } from '@/utils/fetcher';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useState, useContext } from 'react';
import Cart from '@/app/components/Cart';
import CartContext from '@/app/context/CartContext';


const ProductDetails = ({ params }: { params: { id: number } }) => {
    const [openCart, setOpenCart] = useState(false);
    const toggleDrawer = (newOpen: boolean) => {
        setOpenCart(newOpen);
    }
    const productId = params.id;
    const { data: product, error, isLoading } = useSWR(`/api/products/${productId}`, () => publicFetcher(`/api/products/${productId}`))

    const { addItemToCart } = useContext(CartContext)

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarIcon key={i} sx={{ color: rating >= i ? 'pink' : 'inherit', width: "1rem" }} />);
        }
        return stars;
    };

    const handleAddToCart = () => {
        addItemToCart({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price / 100,
            priceId: product.priceId,
            quantity: 1,
            imageUrl: product.imageUrl,
        })
        toggleDrawer(true)
    }

    if (error) return <div>error</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <Container maxWidth="xl" fixed sx={{ py: 4, px: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box sx={{
                    width: "35rem", height: "35rem", position: "relative"
                }}>
                    <Image src={product.imageUrl} fill={true} alt="productImg" style={{ objectFit: "cover" }} />
                </Box>
                <Box sx={{ py: "1rem", px: "4rem" }}>
                    <Typography variant="h3">{product.name}</Typography>
                    < Box sx={{ display: 'flex', gap: "0.5rem", my: "1rem" }}>
                        {renderStars(product.rating)}
                    </Box>
                    <Typography variant="subtitle1">{product.price / 100} €</Typography>
                    <Divider sx={{ my: "1rem" }} />
                    <Typography sx={{ my: "2rem" }}>{product.description}</Typography>
                    <Divider sx={{ my: "1rem" }} />
                    <Button variant="contained" sx={{ py: "1rem", px: "4rem", width: "100%", my: "2rem" }} onClick={handleAddToCart}>Add to cart</Button>
                    <Box sx={{ display: "flex", gap: "2rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#DCF0E2", borderRadius: "4px", py: "1rem", width: "50%" }}>
                            <Box sx={{ background: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                                <LocalAtmIcon sx={{ width: "30px", height: "30px", filter: "invert(47%) sepia(27%) saturate(478%) hue-rotate(113deg) brightness(91%) contrast(86%)", borderRadius: "4px", px: "1rem" }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="subtitle2">Unhappy? Return it!</Typography>
                                <Typography variant="body2">60 Day return policy</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#F6EBFF", borderRadius: "4px", width: "50%" }}>
                            <Box sx={{ background: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", p: 1, }}>
                                <RocketLaunchIcon sx={{ width: "30px", height: "30px", filter: "invert(50%) sepia(96%) saturate(640%) hue-rotate(213deg) brightness(94%) contrast(96%)" }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="subtitle2">Cant wait? Fast delivery!</Typography>
                                <Typography variant="body2">Delivered within 1 week</Typography>
                            </Box>                    </Box>
                    </Box>
                </Box>
            </Container>
            <Cart open={openCart} toggleDrawer={toggleDrawer}></Cart>
        </>
    )
}

export default ProductDetails