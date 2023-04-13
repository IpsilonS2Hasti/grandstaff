import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, alpha, Box, Card, Divider, Tab, Tabs, Typography, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState, useContext } from 'react';
import { Stack } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { EntityContext } from "../context/EntityContext";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ width: '100%', height: { xl: 'calc(100% - 430px)', lg: 'calc(100% - 330px)' } }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const EditAccount = () => {
    const { type: typee, firstName: firstNamee, lastName: lastNamee, _id: userId, email, setEntityState } = useContext(EntityContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState(0);
    const [firstName, setFirstName] = useState(firstNamee);
    const [lastName, setLastName] = useState(lastNamee);
    const [type, setType] = useState(typee);
    const [pass, setPass] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passNew2, setPassNew2] = useState('');
    const [mail, setMail] = useState(email);
    const [error, setError] = useState('');
    let user = JSON.parse(localStorage.getItem('user'));
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseData = () => {
        //console.log('DATA');
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/editData`,
            headers: {
                'Authorization': 'Bearer ' + (user.token ? user.token : '0')
            },
            data: {
                type: type,
                firstName: firstName,
                lastName: lastName,
                password: pass,
            }
        }).then(res => {
            if (res.data) {
                setEntityState(prev => ({
                    ...prev,
                    firstName: firstName,
                    lastName: lastName,
                    type: type
                }));
                setError('');
                setOpen(false);
            }
        }).catch(err => {
            setError(err.response.data.message);
            setOpen(true);
        }).finally(() => {

        });
        if (error === '') setOpen(false);
    };

    const handleClosePass = () => {
        //console.log('PASS');
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/editPassword`,
            headers: {
                'Authorization': 'Bearer ' + (user.token ? user.token : '0')
            },
            data: {
                password: pass,
                newPassword: passNew,
                newPassword2: passNew2
            }
        }).then(res => {
            console.log(res.data);
            if (res.data) {
                setError('');
                setOpen(false);
            }
        }).catch(err => {
            setError(err.response.data.message);
            setOpen(true);
        }).finally(() => {
            
        });
        if (error === '') setOpen(false);
    };

    const handleCloseEmail = () => {
        //console.log('MAIL');
        axios({
            method: 'post',
            url: `https://grandstaff.herokuapp.com/api/editEmail`,
            headers: {
                'Authorization': 'Bearer ' + (user.token ? user.token : '0')
            },
            data: {
                email: mail,
                password: pass,
            }
        }).then(res => {
            if (res.data) {
                setEntityState(prev => ({
                    ...prev,
                    email: mail
                }));
                setError('');
                setOpen(false);
            }
        }).catch(err => {
            setError(err.response.data.message);
            setOpen(true);
        }).finally(() => {
            
        });
        if (error === '') setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <IconButton style={{ marginBottom: '5px' }} onClick={handleClickOpen}>
                <SettingsIcon />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Редакция на данни"}
                </DialogTitle>
                    <Stack direction="row" justifyContent='center' sx={{ marginTop: '-15px' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                            <Tab label="Данни" />
                            <Tab label="Имейл" />
                            <Tab label="Парола" />
                        </Tabs>
                    </Stack>
                <TabPanel value={value} index={0} style={{ marginTop: '25px' }}>
                    <DialogContent style={{ padding: '15px', width: '400px', marginTop: '-25px' }}>
                        <Stack direction={'column'} spacing="15px">
                            <Stack spacing={'15px'} direction='row'>
                                <TextField
                                    required
                                    id="firstName"
                                    label="Име"
                                    defaultValue={firstName}
                                    onChange={e => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                                <TextField
                                    required
                                    id="lastName"
                                    label="Фамилия"
                                    defaultValue={lastName}
                                    onChange={e => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </Stack>
                            <Stack spacing={'15px'} direction='row'>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={type}
                                    sx={{ marginTop: '-10px'}}
                                    name="type"
                                    id="type"
                                    onChange={e => {
                                        if (e.target.value !== 'Musician') {
                                            setType('Enjoyer');
                                        }
                                        else setType('Musician');
                                    }}
                                >
                                    <FormControlLabel value="Musician" control={<Radio />} label="Музикант" />
                                    <FormControlLabel value="Enjoyer" sx={{ marginTop: '-7px' }} control={<Radio />} label="Любител" />
                                </RadioGroup>
                                <FormControl sx={{ width: '235px' }} variant="outlined">
                                    <InputLabel htmlFor="password">Сегашна парола</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => {
                                            setPass(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Парола"
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <Typography color={"red"}>
                                { error }
                            </Typography>
                        <DialogActions>
                            <Button onClick={handleCloseData}>Запамети</Button>
                        </DialogActions>
                    </DialogContent>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ marginTop: '25px' }}>
                    <DialogContent style={{ padding: '15px', width: '400px', marginTop: '-25px' }}>
                        <Stack direction={'column'} spacing="15px">
                            <Stack direction='row'>
                                <TextField sx={{ width: '500px' }}
                                    required
                                    id="email"
                                    label="Имейл"
                                    defaultValue={mail}
                                    onChange={e => {
                                        setMail(e.target.value);
                                    }}
                                />
                            </Stack>
                            <Stack direction='row'>
                                <FormControl variant="outlined" sx={{ width: '500px' }}>
                                    <InputLabel htmlFor="password"  >Сегашна парола</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => {
                                            setPass(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Парола"
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <DialogActions>
                        <Typography color={"red"} sx={{ float: 'left' }}>
                            { error }
                        </Typography>
                            <Button onClick={handleCloseEmail} sx={{ marginTop: '11px' }}>Запамети</Button>
                        </DialogActions>
                    </DialogContent>
                </TabPanel>
                <TabPanel value={value} index={2} style={{ marginTop: '25px' }}>
                    <DialogContent style={{ padding: '15px', width: '400px', marginTop: '-25px' }}>
                        <Stack direction={'column'} spacing="15px">
                            <Stack direction='row'>
                                <FormControl variant="outlined" sx={{ width: '500px' }}>
                                    <InputLabel htmlFor="password">Сегашна парола</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => {
                                            setPass(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Парола"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction='row'>
                                <FormControl variant="outlined" sx={{ width: '500px' }}>
                                    <InputLabel htmlFor="passwordNew">Нова парола</InputLabel>
                                    <OutlinedInput
                                        id="passwordNew"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => {
                                            setPassNew(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Нова парола"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction='row'>
                                <FormControl variant="outlined" sx={{ width: '500px' }}>
                                    <InputLabel htmlFor="passwordNew2"  >Потвърди паролата</InputLabel>
                                    <OutlinedInput
                                        id="passwordNew2"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => {
                                            setPassNew2(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Потвърди парола"
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <Typography color={"red"}>
                                { error }
                            </Typography>
                        <DialogActions>
                            <Button onClick={handleClosePass}>Запамети</Button>
                        </DialogActions>
                    </DialogContent>
                </TabPanel>
            </Dialog>
        </div>
    );
}

export default EditAccount;