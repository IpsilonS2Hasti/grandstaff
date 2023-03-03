import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const EditAccount = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
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
            <IconButton style={{marginBottom: '5px'}} onClick={handleClickOpen}>
                <SettingsIcon/>
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
                <DialogContent style={{ padding: '15px', width: '400px' }}>
                    <Stack direction={'column'} spacing="15px">
                        <Stack spacing={'15px'} direction='row'>
                            <TextField
                                required
                                id="first-name"
                                label="Име"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="last-name"
                                label="Фамилия"
                                defaultValue="Hello World"
                            />
                        </Stack>
                        <FormControl sx={{ m: 1, width: '210px' }} variant="outlined">
                            <InputLabel htmlFor="new-password">Password</InputLabel>
                            <OutlinedInput
                                id="new-password"
                                type={showPassword ? 'text' : 'password'}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Избери</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditAccount;