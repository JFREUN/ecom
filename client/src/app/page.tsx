'use client'

import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import headerImg from "../../public/home/header.jpg"
import useSWR from "swr";
import { fetcher, publicFetcher } from "@/utils/fetcher";
import { Product } from "@/types/product";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Home() {
  return (
    <>
      <HeaderSection />
      <FavouritesSection />
    </>
  );
}

const HeaderSection = () => {
  return (
    <Container maxWidth="xl" fixed sx={{ py: 4, px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "flex-start" }} gap={2}>
        <Typography variant="h1" >Hydrate your face</Typography>
        <Typography variant="subtitle1" my={2} maxWidth={"30rem"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque ullam adipisci minus explicabo!</Typography>
        <Button variant="contained" sx={{ py: "1rem", px: "4rem" }}>Shop now</Button></Box>
      <Box sx={{ borderTopLeftRadius: "50%", borderTopRightRadius: "50%", overflow: "hidden" }}><Image src={headerImg} alt={""} width={500}></Image></Box>
    </Container>
  )
}

const FavouritesSection = () => {
  const { data, error, isLoading } = useSWR('/api/products', () => publicFetcher("/api/products"))
  const { data: favourites, error: favouritesError, isLoading: favouritesAreLoading } = useSWR('/api/products?query=favourites', () => publicFetcher("/api/products?query=favourites"))
  console.log("All products,favourites", { data, favourites })
  // const product: Product[] = [
  //   {
  //     id: 1,
  //     name: "Moisturizer",
  //     description: "blablable",
  //     price: 25,
  //   }
  // ]

  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h2" mb={2}>Our favourites</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {favourites?.map((product: Product, index: number) => (<Card key={product.id} sx={{ maxWidth: 345, boxShadow: "none", position: "relative" }}>

          <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "50%", width: 20, height: 20, justifyContent: "center", display: "flex", position: "absolute", right: 20, top: 20 }}><FavoriteBorderIcon /></Box>
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
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              <Link href="">Read more</Link>
            </Box>

          </CardContent>
          <CardActions sx={{ p: 0 }}>
            <Button size="large" variant="contained" sx={{ width: "100%" }}>Add to cart</Button>
          </CardActions>
        </Card>))}
      </Box>
    </Container>
  )
}