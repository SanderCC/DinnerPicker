import React, {useState} from 'react';
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListDivider,
    ListItem,
    ListItemButton,
    ListItemContent,
    Sheet,
    Typography
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SwipeIcon from '@mui/icons-material/Swipe';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {isLoggedIn, logout} = useAuth();

    const menuItems = [
        {label: 'Home', icon: <HomeIcon/>, path: '/'},
        {label: 'Recipes', icon: <RestaurantIcon/>, path: '/recipes'},
        {label: 'Dinner Picker', icon: <SwipeIcon/>, path: '/swipe'},
        {label: 'Profile', icon: <PersonIcon/>, path: '/profile', auth: true},
    ];

    const handleNavigate = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Sheet
            component="nav"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: 'background.surface',
                borderBottom: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                zIndex: 1100,
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
                <img
                    src="https://private-user-images.githubusercontent.com/58855319/552940169-12595f51-a2f1-49a5-9569-ccfb180819f7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzE2NTgxMjcsIm5iZiI6MTc3MTY1NzgyNywicGF0aCI6Ii81ODg1NTMxOS81NTI5NDAxNjktMTI1OTVmNTEtYTJmMS00OWE1LTk1NjktY2NmYjE4MDgxOWY3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAyMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMjIxVDA3MTAyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTIzM2JlZGQ1MDI1M2UxOWNkYzVlMGJkNmU1MTE0N2RjNjhjZDg0ODg4MWE4MWZiOGZhMzVjMzhiMGQyZTFiOTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.m3ML7blv5TjTzAcvK1wXObbhEmuQb-mAYswSZSnGcos"
                    alt="Dinner Picker Logo"
                    style={{height: '40px', cursor: 'pointer'}}
                    onClick={() => navigate('/')}
                />
                <Typography
                    level="title-lg"
                    sx={{cursor: 'pointer'}}
                    onClick={() => navigate('/')}
                >
                    Dinner Picker
                </Typography>
            </Box>

            <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                <MenuIcon/>
            </IconButton>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'background.surface',
                            p: 2,
                            width: '280px',
                        },
                    },
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                    <Typography level="title-lg">Menu</Typography>
                    <IconButton variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <List size="lg" sx={{'--ListItem-radius': '8px'}}>
                    {menuItems.map((item) => (
                        (!item.auth || isLoggedIn) && (
                            <ListItem key={item.label}>
                                <ListItemButton onClick={() => handleNavigate(item.path)}>
                                    {item.icon}
                                    <ListItemContent>
                                        <Typography level="title-md">{item.label}</Typography>
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        )
                    ))}
                    <ListDivider/>
                    {!isLoggedIn ? (
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigate('/login')}>
                                <LoginIcon/>
                                <ListItemContent>
                                    <Typography level="title-md">Login / Register</Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ) : (
                        <ListItem>
                            <ListItemButton onClick={() => {
                                logout();
                                setOpen(false);
                            }}>
                                <LoginIcon/>
                                <ListItemContent>
                                    <Typography level="title-md">Logout</Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </Sheet>
    );
};

export default Navbar;
