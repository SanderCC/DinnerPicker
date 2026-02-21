import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    List,
    ListDivider,
    ListItem,
    ListItemButton,
    ListItemContent,
    Sheet,
    Typography
} from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Container maxWidth="sm" sx={{py: 4}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4}}>
                <Avatar
                    sx={{width: 100, height: 100, mb: 2, fontSize: '2rem'}}
                    variant="soft"
                    color="primary"
                >
                    JD
                </Avatar>
                <Typography level="h3">John Doe</Typography>
                <Typography level="body-md" sx={{color: 'text.secondary'}}>john.doe@example.com</Typography>
            </Box>

            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'md',
                    overflow: 'hidden',
                }}
            >
                <List size="lg">
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/recipes')}>
                            <FavoriteIcon/>
                            <ListItemContent>Favorite Recipes</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListDivider inset="start"/>
                    <ListItem>
                        <ListItemButton>
                            <HistoryIcon/>
                            <ListItemContent>Previous Sessions</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListDivider inset="start"/>
                    <ListItem>
                        <ListItemButton>
                            <SettingsIcon/>
                            <ListItemContent>Settings</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Sheet>

            <Button
                fullWidth
                variant="soft"
                color="danger"
                startDecorator={<LogoutIcon/>}
                sx={{mt: 4}}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Container>
    );
};

export default Profile;
