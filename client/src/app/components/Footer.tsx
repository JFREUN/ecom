'use client'

import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import React, { useState } from 'react'



const Footer = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Container maxWidth="xl" fixed sx={{ bgcolor: '#F5F5F5', boxShadow: 'none', color: '#333333', position: "static", py: 8 }}>
            <Toolbar disableGutters sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{ textDecoration: "none", color: "inherit" }}

                        >
                            RADIANT
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton sx={{ p: 1 }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={{ p: 1 }}>
                            <XIcon />
                        </IconButton>
                        <IconButton sx={{ p: 1 }}>
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography>&copy; 2024 Company</Typography>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            Terms
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            Privacy
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            About
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            FAQ
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            Contact
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#333333', display: 'block' }}
                        >
                            Blog
                        </Button>
                    </Box>
                </Box>

            </Toolbar>
        </Container>
    )

}
export default Footer