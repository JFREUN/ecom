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
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useContext, useState } from "react";
import CartContext from "./context/CartContext";
import Cart from "./components/Cart";
import IconButton from '@mui/material/IconButton';
import { User } from "@/types/user";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";


type FavouritesProps = {
  handleAddToCart: (product: Product) => void
}
export default function Home() {
  const [openCart, setOpenCart] = useState(false);
  const { addItemToCart } = useContext(CartContext)

  const toggleDrawer = (newOpen: boolean) => {
    setOpenCart(newOpen);
  }

  const handleAddToCart = (product: Product) => {
    addItemToCart({
      _id: product._id,
      name: product.name,
      description: product.description,
      rating: product.rating,
      price: product.price,
      quantity: 1,
    })
    toggleDrawer(true)
  }
  return (
    <>
      <HeaderSection />
      <FavouritesSection handleAddToCart={handleAddToCart} />
      <BenefitsSection />
      <Cart open={openCart} toggleDrawer={toggleDrawer}></Cart>
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

const FavouritesSection = ({ handleAddToCart }: FavouritesProps) => {
  const { data: favourites, error, isLoading } = useSWR('/api/products?query=favourites', () => publicFetcher("/api/products?query=favourites"))

  const { user } = useContext(AuthContext)
  const handleUpdateUser = async (data: any) => {
    const updateUser: User = {
      _id: user?._id || "",
      email: data.email,
      name: data.name,
    }
    try {
      const res = await axios.patch(`/api/user/${user?._id}`, JSON.stringify(updateUser), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        console.log("User update successful!")
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const onSubmit: SubmitHandler<User> = async (data) => {
    await handleUpdateUser(data);
  }
  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h2" mb={"3rem"}>Our favourites</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {favourites?.map((product: Product, index: number) => (
          <Card key={product._id} sx={{ maxWidth: 345, boxShadow: "none", position: "relative", width: "30%" }}>
            <IconButton>
              <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "50%", width: 20, height: 20, justifyContent: "center", display: "flex", position: "absolute", right: 20, top: 20 }}>
                <FavoriteBorderIcon sx={{
                  filter: 'invert(64%) sepia(32%) saturate(4203%) hue-rotate(212deg) brightness(93%) contrast(97%)',
                }} />
              </Box>
            </IconButton>
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
              <Button size="large" variant="contained" sx={{ width: "100%" }} onClick={() => handleAddToCart(product)}>Add to cart</Button>
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
                <Typography sx={{ fontWeight: "500" }}>{benefit.title}</Typography>
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