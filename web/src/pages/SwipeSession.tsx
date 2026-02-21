import React, {useState} from 'react';
import {AspectRatio, Box, Button, Card, Container, IconButton, Stack, Typography} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';

const SwipeSession = () => {
    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: 'Homemade Pizza',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600'
        },
        {
            id: 2,
            title: 'Fresh Salad Bowl',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600'
        },
        {
            id: 3,
            title: 'Burger with Fries',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600'
        },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matched, setMatched] = useState(false);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right' && currentIndex === 0) {
            // Simulate a match for the first one for demo purposes
            setMatched(true);
        } else {
            setCurrentIndex((prev) => (prev + 1) % recipes.length);
        }
    };

    if (matched) {
        return (
            <Container maxWidth="sm" sx={{py: 8, textAlign: 'center'}}>
                <Typography level="h1" color="primary" sx={{mb: 2}}>It's a Match!</Typography>
                <Typography level="h4" sx={{mb: 4}}>Everyone in the group wants {recipes[0].title}!</Typography>
                <AspectRatio ratio="4/3" sx={{borderRadius: 'md', mb: 4}}>
                    <img src={recipes[0].image} alt="matched meal"/>
                </AspectRatio>
                <Button size="lg" onClick={() => setMatched(false)}>Continue Swiping</Button>
            </Container>
        );
    }

    const currentRecipe = recipes[currentIndex];

    return (
        <Container maxWidth="sm" sx={{py: 4, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography level="h2">Dinner Picker</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <PeopleIcon color="primary"/>
                    <Typography level="title-md">4 in group</Typography>
                </Box>
            </Box>

            <Box sx={{flexGrow: 1, position: 'relative', mb: 4}}>
                <Card
                    variant="outlined"
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 0,
                        overflow: 'hidden',
                        boxShadow: 'xl',
                    }}
                >
                    <AspectRatio ratio="3/4" sx={{flexGrow: 1}}>
                        <img src={currentRecipe.image} alt={currentRecipe.title}/>
                    </AspectRatio>
                    <Box sx={{p: 3, bgcolor: 'background.surface'}}>
                        <Typography level="h3">{currentRecipe.title}</Typography>
                        <Typography level="body-md" sx={{color: 'text.secondary'}}>
                            Swipe right if you like it, left if you don't.
                        </Typography>
                    </Box>
                </Card>
            </Box>

            <Stack direction="row" spacing={4} justifyContent="center" sx={{pb: 4}}>
                <IconButton
                    size="lg"
                    variant="solid"
                    color="danger"
                    sx={{
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        boxShadow: 'md',
                    }}
                    onClick={() => handleSwipe('left')}
                >
                    <CloseIcon sx={{fontSize: '2rem'}}/>
                </IconButton>
                <IconButton
                    size="lg"
                    variant="solid"
                    color="success"
                    sx={{
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        boxShadow: 'md',
                    }}
                    onClick={() => handleSwipe('right')}
                >
                    <FavoriteIcon sx={{fontSize: '2rem'}}/>
                </IconButton>
            </Stack>
        </Container>
    );
};

export default SwipeSession;
