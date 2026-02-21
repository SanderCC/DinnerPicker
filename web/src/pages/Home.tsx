import React from 'react';
import {AspectRatio, Box, Button, Card, CardContent, Container, Grid, Typography} from '@mui/joy';
import {useNavigate} from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SwipeIcon from '@mui/icons-material/Swipe';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{py: 4}}>
            <Box sx={{textAlign: 'center', mb: 8, mt: 4}}>
                <Typography level="h1" sx={{fontSize: '3rem', mb: 2}}>
                    Dinner Picker
                </Typography>
                <Typography level="h3" fontWeight="normal" sx={{color: 'text.secondary', mb: 4}}>
                    Find the perfect meal for tonight, together.
                </Typography>
                <Button size="lg" onClick={() => navigate('/swipe')}>
                    Start Swiping
                </Button>
            </Box>

            <Grid container spacing={3} sx={{flexGrow: 1}}>
                <Grid xs={12} md={4}>
                    <Card variant="soft" sx={{height: '100%'}}>
                        <CardContent sx={{alignItems: 'center', textAlign: 'center'}}>
                            <AspectRatio ratio="1"
                                         sx={{width: 80, mb: 2, borderRadius: '50%', bgcolor: 'primary.softBg'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <RestaurantIcon sx={{fontSize: '2rem', color: 'primary.solidBg'}}/>
                                </Box>
                            </AspectRatio>
                            <Typography level="title-lg">Browse Recipes</Typography>
                            <Typography level="body-md">
                                Explore hundreds of public recipes or add your own to your personal collection.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} md={4}>
                    <Card variant="soft" sx={{height: '100%'}}>
                        <CardContent sx={{alignItems: 'center', textAlign: 'center'}}>
                            <AspectRatio ratio="1"
                                         sx={{width: 80, mb: 2, borderRadius: '50%', bgcolor: 'primary.softBg'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <SwipeIcon sx={{fontSize: '2rem', color: 'primary.solidBg'}}/>
                                </Box>
                            </AspectRatio>
                            <Typography level="title-lg">Swipe & Match</Typography>
                            <Typography level="body-md">
                                Swipe through meal ideas. It's like Tinder, but for your dinner!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} md={4}>
                    <Card variant="soft" sx={{height: '100%'}}>
                        <CardContent sx={{alignItems: 'center', textAlign: 'center'}}>
                            <AspectRatio ratio="1"
                                         sx={{width: 80, mb: 2, borderRadius: '50%', bgcolor: 'primary.softBg'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <GroupIcon sx={{fontSize: '2rem', color: 'primary.solidBg'}}/>
                                </Box>
                            </AspectRatio>
                            <Typography level="title-lg">Group Decisions</Typography>
                            <Typography level="body-md">
                                Invite friends or family to a session and find a lunch idea that everyone loves.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
