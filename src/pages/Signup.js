import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function Signup() {
    const { signup, isLoading, error } = useSignup();
    const { login, errorr, isLoadingg } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (event) => { //async await is unnecessary here?!
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await signup(data.get('email'), data.get('password'), data.get('password2'), data.get('firstName'), data.get('lastName'), data.get('type'));
        await login(data.get('email'), data.get('password'));
        if (localStorage.getItem('user')) navigate('/profile');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрирай се
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Име"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Имейл"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Парола"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password2"
                                label="Потвърди паролата"
                                type="password"
                                id="password2"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Аз съм:</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Enjoyer"
                                    name="type"
                                    id="type"
                                >
                                    <FormControlLabel value="Musician" control={<Radio />} label="Музикант" />
                                    <FormControlLabel value="Enjoyer" control={<Radio />} label="Любител" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Регистрация
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/login" variant="body2">
                                Вече имате акаунт? Впишете се!
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography color={"red"}>
                                { error }
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}