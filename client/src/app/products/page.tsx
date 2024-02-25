'use client'
import { Product } from '@/types/product'
import { publicFetcher } from '@/utils/fetcher'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Link, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr'

export default function Products() {
    const { data: products, error, isLoading } = useSWR('/api/products?query=favourites', () => publicFetcher("/api/products"))

    if (error) return <div>error</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <Container sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h2" mb={"3rem"}>Our products</Typography>
            <Box>
                <Box></Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", width: "100%" }}>{products.map((product: Product) => (
                    <Card key={product.id} sx={{ boxShadow: "none", position: "relative" }}>

                        <CardMedia
                            sx={{ height: 300 }}
                            image="/home/defaultProductImg.jpg"
                            title="green iguana"
                        />
                        <CardContent sx={{ p: 0, my: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", }}><Typography gutterBottom variant="subtitle1" component="div">
                                {product.name}
                            </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {product.price} €
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "flex-start" }}>
                                    {product.description.slice(0, 100)}
                                </Typography>
                                <Link href="">Read more</Link>
                            </Box>

                        </CardContent>
                        <CardActions sx={{ p: 0 }}>
                            <Button size="large" variant="contained" sx={{ width: "100%" }}>Add to cart</Button>
                        </CardActions>
                    </Card>
                ))}</Box>
            </Box>
        </Container>
    )
}
