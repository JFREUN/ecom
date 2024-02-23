'use client'

import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import headerImg from "../../public/home/header.jpg"
import useSWR from "swr";
import { fetcher, publicFetcher } from "@/utils/fetcher";
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
  const Product = [
    {
      id: 1,
      name: "Moisturizer",
      description: "blablable",
      price: "25$"
    }
  ]

  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <Container>
      <Typography variant="h2">Our favourites</Typography>
      <Box>
      </Box>
    </Container>
  )
}