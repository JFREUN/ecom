'use client'
import { Product } from '@/types/product'
import { publicFetcher } from '@/utils/fetcher'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr'
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link'


export default function Products() {
    const { data: products, error, isLoading } = useSWR('/api/products?query=favourites', () => publicFetcher("/api/products"))
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarIcon key={i} sx={{ color: rating >= i ? 'pink' : 'inherit', width: "1rem" }} />);
        }
        return stars;
    };
    if (error) return <div>error</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h2" mb={"3rem"}>Our products</Typography>
            <Box>
                <Box></Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "13rem 13rem 13rem 13rem", width: "100%", gap: 5 }}>{products.map((product: Product) => (
                    <Link key={product.id} href="">
                        <Card sx={{ boxShadow: "none", position: "relative", }}>
                            <CardMedia
                                sx={{ height: 180 }}
                                image="/home/defaultProductImg.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{
                                px: "1rem", height: "8rem", display: "flex", flexDirection: "column", justifyContent: "space-between"
                            }}>
                                <Box>
                                    < Box sx={{ display: 'flex', gap: "0.5rem" }}>
                                        {renderStars(product.rating)}
                                    </Box>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: "600", mt: "1rem" }}>
                                        {product.name}
                                    </Typography>
                                </Box>
                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: "#9581EB", alignSel: "flex-end" }}>
                                    {product.price} €
                                </Typography>

                            </CardContent>
                        </Card>
                    </Link>
                ))}</Box>
            </Box >
        </Container >
    )
}
