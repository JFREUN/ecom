'use client'

import { Button, Container, SvgIcon, Typography } from "@mui/material";
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
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

export default function Home() {
  return (
    <>
      <HeaderSection />
      <FavouritesSection />
      <BenefitsSection />

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
  const { data: favourites, error, isLoading } = useSWR('/api/products?query=favourites', () => publicFetcher("/api/products?query=favourites"))

  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h2" mb={"3rem"}>Our favourites</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {favourites?.map((product: Product, index: number) => (
          <Card key={product.id} sx={{ maxWidth: 345, boxShadow: "none", position: "relative", width: "30%" }}>
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
                  {product.description.slice(0, 100)}
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

const BenefitsSection = () => {
  const benefits = [
    { id: 1, icon: <BalanceOutlinedIcon />, title: "Balanced Formulas", description: "Restore harmony to your skin with carefully curated blends." },
    { id: 2, icon: <SpaOutlinedIcon />, title: "Mind-Body Wellness", description: "Nourish your skin and uplift your spirit with holistic rituals." },
    { id: 3, icon: <VolunteerActivismOutlinedIcon />, title: "Nurturing Care", description: "Pamper your skin with tender, loving care from nature's bounty." }
  ];
  return (
    <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h2" mb={"3rem"}>Our benefits</Typography>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          {benefits.map((benefit) => (
            <Box key={benefit.id} sx={{ display: "flex", gap: 2, my: 2, alignItems: "center", maxWidth: "80%" }}>
              <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "50%", width: 20, height: 20, justifyContent: "center", display: "flex" }}>{benefit.icon}</Box>
              <Box>
                <Typography>{benefit.title}</Typography>
                <Typography>{benefit.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{
          width: "30rem", height: "25rem", position: "relative"
        }}>
          < Image src={"/home/benefitsImage.jpg"} alt={"stockPhoto"} fill={true} style={{ objectFit: "cover" }}></Image>
        </Box>

      </Box >
    </Container >
  )
}