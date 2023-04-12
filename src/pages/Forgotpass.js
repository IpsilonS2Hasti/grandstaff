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
import axios from "axios";
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function Forgotpass() {
    const navigate = useNavigate();
    const [ error, setError ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    const handleSubmit = async (event) => { //async await is unnecessary here?!
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        axios({
            method: 'post',
            url: 'https://grandstaff.herokuapp.com/api/forgotPassword',
            data: {
                email: email
            }
        }).then(res => {
            setIsLoading(true);
            setError("Успешно изпратен имейл за смяна на паролата!");
        }).catch(err => {
            setError(err.response.data.message);
        });
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
                    Забравена парола?
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} width='396px'>
                            <TextField
                                required
                                fullWidth
                                name="email"
                                label="Имейл на акаунта"
                                type="email"
                                id="email"
                                autoComplete="email"
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
                        Изпрати имейл
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography color={error.includes('Успешно')?"green":"red"}>
                                { error }
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}