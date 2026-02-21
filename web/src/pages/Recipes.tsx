import React, {useState} from 'react';
import {
    AspectRatio,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Input,
    Tab,
    tabClasses,
    TabList,
    Tabs,
    Typography
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';

const Recipes = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const publicRecipes = [
        {
            id: 1,
            title: 'Spaghetti Carbonara',
            category: 'Italian',
            image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400'
        },
        {
            id: 2,
            title: 'Chicken Tikka Masala',
            category: 'Indian',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400'
        },
        {
            id: 3,
            title: 'Beef Tacos',
            category: 'Mexican',
            image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=400'
        },
        {
            id: 4,
            title: 'Sushi Platter',
            category: 'Japanese',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400'
        },
    ];

    const myRecipes = [
        {
            id: 5,
            title: 'Grandma\'s Apple Pie',
            category: 'Dessert',
            image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=400'
        },
        {
            id: 6,
            title: 'Quick Avocado Toast',
            category: 'Breakfast',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400'
        },
    ];

    const recipesToShow = tabIndex === 0 ? publicRecipes : myRecipes;

    return (
        <Container sx={{py: 4}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexDirection: {xs: 'column', sm: 'row'},
                gap: 2
            }}>
                <Typography level="h2">Recipes</Typography>
                <Input
                    startDecorator={<SearchIcon/>}
                    placeholder="Search recipes..."
                    sx={{width: {xs: '100%', sm: '300px'}}}
                />
            </Box>

            <Tabs
                value={tabIndex}
                onChange={(e, v) => setTabIndex(v as number)}
                sx={{
                    bgcolor: 'transparent',
                    [`& .${tabClasses.root}`]: {
                        bgcolor: 'transparent',
                        flex: 1,
                        [`&.${tabClasses.selected}`]: {
                            color: 'primary.plainColor',
                            '&:after': {
                                height: '3px',
                                bgcolor: 'primary.500',
                            },
                        },
                    },
                }}
            >
                <TabList
                    disableUnderline
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        borderRadius: 'xl',
                        bgcolor: 'background.level1',
                        mb: 4
                    }}
                >
                    <Tab disableIndicator>Public Recipes</Tab>
                    <Tab disableIndicator>My Recipes</Tab>
                </TabList>

                <Grid container spacing={3}>
                    {recipesToShow.map((recipe) => (
                        <Grid key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                            <Card variant="outlined" sx={{'--Card-padding': '0px', overflow: 'hidden'}}>
                                <AspectRatio ratio="4/3">
                                    <img src={recipe.image} alt={recipe.title} loading="lazy"/>
                                </AspectRatio>
                                <CardContent sx={{p: 2}}>
                                    <Chip size="sm" variant="soft" color="primary" sx={{mb: 1}}>
                                        {recipe.category}
                                    </Chip>
                                    <Typography level="title-lg">{recipe.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Tabs>
        </Container>
    );
};

export default Recipes;
