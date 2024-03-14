'use client'
import { Box, Icon, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useContext, useEffect, useState } from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { AuthContext } from '../context/AuthContext';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Orders } from '../components/profile/orders';
import { Account } from '../components/profile/account';
import { Favourites } from '../components/profile/favourites';
import { Payment } from '../components/profile/payment';
import { Password } from '../components/profile/password';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

type ProfileLink = {
    icon: React.JSX.Element;
    name: string;
    state: boolean;
    setState: () => void;
    component: React.JSX.Element;
}

type ProfileNavProps = {
    profileLinks: ProfileLink[];
}
const ProfilePage = () => {
    const defaultLinks = {
        orders: false,
        account: false,
        favourites: false,
        payment: false,
        password: false,
    }
    const { user, isLoggedIn } = useContext(AuthContext);
    const [allLinks, setAllLinks] = useState(defaultLinks);
    const router = useRouter();

    const handleNav = (state: string) => {
        setAllLinks(defaultLinks);
        setAllLinks(prevState => ({ ...prevState, [state]: true }))
    }

    const profileLinks: ProfileLink[] = [
        {
            icon: <ManageAccountsOutlinedIcon />,
            name: "My Orders",
            state: allLinks.orders,
            setState: () => handleNav("orders"),
            component: <Orders />
        },
        {
            icon: <ShoppingBasketOutlinedIcon />,
            name: "My Account",
            state: allLinks.account,
            setState: () => handleNav("account"),
            component: <Account />
        },
        {
            icon: <FavoriteBorderOutlinedIcon />,
            name: "My Favourites",
            state: allLinks.favourites,
            setState: () => handleNav("favourites"),
            component: <Favourites />
        },
        {
            icon: <CreditCardOutlinedIcon />,
            name: "Payment Information",
            state: allLinks.payment,
            setState: () => handleNav("payment"),
            component: <Payment />
        },
        {
            icon: <LockOutlinedIcon />,
            name: "Change Password",
            state: allLinks.password,
            setState: () => handleNav("password"),
            component: <Password />
        },
    ];

    useEffect(() => {
        if (user) setAllLinks((prevState) => ({ ...prevState, orders: true }))
    }, [user])

    if (!isLoggedIn) router.push("/");
    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", gap: 3 }}>
            <ProfileNav profileLinks={profileLinks} />
            {profileLinks.map(({ component, state }, index) => (
                (<Box key={index}>
                    {state && component}
                </Box>)
            ))}
        </Container >
    )
}


const ProfileNav = ({ profileLinks }: ProfileNavProps) => {
    const { user, logOutUser } = useContext(AuthContext);
    return (
        <Box sx={{
            border: "1px solid #C5C5C5", p: 2, borderRadius: "5px", width: "20rem", pb: 5
        }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 1 }}>
                    <Icon sx={{ backgroundColor: "#CDBEF6", color: "white", borderRadius: "50%", p: 1 }}>
                        <PersonOutlinedIcon />
                    </Icon>
                    <Typography>{user?.name}</Typography>
                </Box>
                <IconButton onClick={logOutUser}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Paper sx={{ width: 320, maxWidth: '100%', borderStyle: "none", boxShadow: "none", background: "inherit" }}>
                <MenuList>
                    {profileLinks.map((link, index) => (
                        <MenuItem key={index} sx={{ py: 2 }} onClick={link.setState}>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText>{link.name}</ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Paper>
        </Box >
    )
}


export default ProfilePage;