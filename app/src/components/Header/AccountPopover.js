import React, { useRef, useState } from 'react';
import { Edit, Home, Settings } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import MenuPopover from '../MenuPopover';

export default function AccountPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const avatar = '/static/avatar_default.jpg';

    const MENU_OPTIONS = [
        {
            label: 'Home',
            icon: (
                <Home
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24
                    }}
                />
            ),
            linkTo: '/'
        },
        {
            label: 'Profile',
            icon: (
                <Edit
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24
                    }}
                />
            ),
            linkTo: '/profile'
        },
        {
            label: 'Settings',
            icon: (
                <Settings
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24
                    }}
                />
            ),
            linkTo: '/settings'
        }
    ];

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                        }
                    })
                }}
            >
                <Avatar src={avatar} />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        Hello
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        Horld
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        to={option.linkTo}
                        component={RouterLink}
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        {option.icon}

                        {option.label}
                    </MenuItem>
                ))}

                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button
                        fullWidth
                        color="inherit"
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}
