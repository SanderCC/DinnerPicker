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
import {postObjectWithResponse} from "../functions/objectService";

const LoginRegister = () => {
    const [index, setIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = await postObjectWithResponse<{ email: string, password: string }, {
                    token: string,
                    errors: string[],
                    success: boolean
                }>('/Identity/Login', {email, password});

                if (response.data.success) {
                    login(response.data.token);
                    enqueueSnackbar('Logged in successfully!', {variant: 'success'});
                    navigate('/');
                } else {
                    response.data.errors.forEach(err => enqueueSnackbar(err, {variant: 'error'}));
                }
            } catch (error: any) {
                enqueueSnackbar(error.message || 'Login failed', {variant: 'error'});
            }
        } else {
            enqueueSnackbar('Please fill in all fields', {variant: 'error'});
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            enqueueSnackbar('Please fill in all fields', {variant: 'error'});
            return;
        }

        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', {variant: 'error'});
            return;
        }

        try {
            const response = await postObjectWithResponse<{
                email: string,
                password: string,
                firstName: string,
                lastName: string
            }, {
                succeeded: boolean,
                errors: { code: string, description: string }[]
            }>('/Identity/Register', {email, password, firstName, lastName});

            if (response.data.succeeded) {
                enqueueSnackbar('Registered successfully! You can now login.', {variant: 'success'});
                setIndex(0);
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
            } else {
                response.data.errors.forEach(err => enqueueSnackbar(err.description, {variant: 'error'}));
            }
        } catch (error: any) {
            enqueueSnackbar(error.message || 'Registration failed', {variant: 'error'});
        }
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
                    onChange={(_event, value) => setIndex(value as number)}
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
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="John"
                                        />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Doe"
                                        />
                                    </FormControl>
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
                                    <FormControl required>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
