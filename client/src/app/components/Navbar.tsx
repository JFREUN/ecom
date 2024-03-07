'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Link from 'next/link';
import { Badge } from '@mui/material';
import CartContext from '../context/CartContext';
import { useContext, useEffect } from 'react';
import { Product } from '@/types/product';

const pages = [{ title: 'Products', route: '/products' }, { title: 'Pricing', route: '/pricing' }, { title: 'About', route: '/about' }]
const settings = ['Profile', 'Account', 'Dashboard', 'RADIANTut'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [totalItems, setTotalItems] = React.useState(0)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const { cart } = useContext(CartContext);
    const calculateTotalItems = (items: Product[]) => {
        let totalItems = 0;
        items.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }
    useEffect(() => {
        if (cart) {
            const newTotalItems = calculateTotalItems(cart.items);
            setTotalItems(newTotalItems)
        }
    }, [cart])
    return (
        <AppBar position="static" sx={{ bgcolor: '#f8f9fa', boxShadow: 'none', color: '#333333' }}>
            <Container maxWidth="xl" fixed>
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{ textDecoration: "none", color: "inherit" }}

                    >
                        RADIANT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                color: '#333333'
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{ color: '#333333' }}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            textDecoration: 'none',
                        }}
                    >
                        RADIANT
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }} gap={2}>
                        {pages.map((page, index) => (
                            <Link
                                href={page.route}
                                key={index}
                                onClick={handleCloseNavMenu}

                            >
                                {page.title}
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'flex' }} gap={2}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                        {cart && cart.items.length > 0 ?
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                                <Badge badgeContent={totalItems} color="primary" >
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                            :
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                                <ShoppingBagOutlinedIcon />
                            </IconButton>}
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                            <PersonOutlineIcon />
                        </IconButton>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;