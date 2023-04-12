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
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';

export default function Resetpass() {
    const [ error, setError ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
    const { search } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => { //async await is unnecessary here?!
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/resetPassword${search}`,
            data: {
                password: data.get('password'),
                password2: data.get('password2')
            }
        }).then(res => {
            console.log(res);
            navigate('/login');
        }).catch(err => {
            setError(err.response.data.message);
        });
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
                    Промяна на паролата
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Запамети
                    </Button>
                    <Grid container justifyContent="flex-end">
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