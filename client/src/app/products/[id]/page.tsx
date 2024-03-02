'use client'

import { Box, Button, Container, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import useSWR from 'swr';
import StarIcon from '@mui/icons-material/Star';
import { publicFetcher } from '@/utils/fetcher';


const ProductDetails = ({ params }: { params: { id: number } }) => {
    const productId = params.id;
    const { data: product, error, isLoading } = useSWR(`/api/products/${productId}`, () => publicFetcher(`/api/products/${productId}`))
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarIcon key={i} sx={{ color: rating >= i ? 'pink' : 'inherit', width: "1rem" }} />);
        }
        return stars;
    };
    if (error) return <div>error</div>
    if (isLoading) return <div>Loading...</div>
    console.log(params.id)
    return (
        <Container maxWidth="xl" fixed sx={{ py: 4, px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{
                width: "35rem", height: "35rem", position: "relative"
            }}>
                <Image src="/home/defaultProductImg.jpg" fill={true} alt="productImg" style={{ objectFit: "cover" }} />
            </Box>
            <Box>
                <Typography variant="h3">{product.name}</Typography>
                <Typography variant="subtitle1">{product.price} €</Typography>

                < Box sx={{ display: 'flex', gap: "0.5rem" }}>
                    {renderStars(product.rating)}
                </Box>
                <Divider />
                <Typography>{product.description}</Typography>
                <Button>Add to cart</Button>
                <Box>
                    <Box>
                        {/* <Box><Image></Image></Box> */}
                        <Typography>60 Day return policy</Typography>
                    </Box>
                    <Box>
                        {/* <Box><Image></Image></Box> */}
                        <Typography>Fast delivery blabla</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default ProductDetails