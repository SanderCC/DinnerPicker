import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Sheet,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs
} from '@mui/joy';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useSnackbar} from 'notistack';

const LoginRegister = () => {
    const [index, setIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        if (email && password) {
            login('mock-token');
            enqueueSnackbar('Logged in successfully!', {variant: 'success'});
            navigate('/');
        } else {
            enqueueSnackbar('Please fill in all fields', {variant: 'error'});
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock register
        enqueueSnackbar('Registered successfully! You can now login.', {variant: 'success'});
        setIndex(0);
    };

    return (
        <Container maxWidth="sm" sx={{py: 8}}>
            <Sheet
                variant="soft"
                sx={{
                    p: 4,
                    borderRadius: 'md',
                    boxShadow: 'md',
                }}
            >
                <Tabs
                    aria-label="Login or Register"
                    value={index}
                    onChange={(event, value) => setIndex(value as number)}
                    sx={{
                        bgcolor: 'transparent',
                        [`& .${tabClasses.root}`]: {
                            bgcolor: 'transparent',
                            flex: 1,
                            fontWeight: 'lg',
                            '&:hover': {
                                bgcolor: 'transparent',
                            },
                            [`&.${tabClasses.selected}`]: {
                                color: 'primary.plainColor',
                                '&:after': {
                                    height: '3px',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
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
                        }}
                    >
                        <Tab disableIndicator>Login</Tab>
                        <Tab disableIndicator>Register</Tab>
                    </TabList>

                    <Box sx={{mt: 3}}>
                        {index === 0 ? (
                            <form onSubmit={handleLogin}>
                                <Stack spacing={2}>
                                    <FormControl required>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                        />
                                    </FormControl>
                                    <Button type="submit" fullWidth sx={{mt: 1}}>
                                        Log in
                                    </Button>
                                </Stack>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <Stack spacing={2}>
                                    <FormControl required>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="your@email.com"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                        />
                                    </FormControl>
                                    <Button type="submit" fullWidth sx={{mt: 1}}>
                                        Register
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Box>
                </Tabs>
            </Sheet>
        </Container>
    );
};

export default LoginRegister;
