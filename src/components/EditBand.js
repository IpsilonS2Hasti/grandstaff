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
import { useParams } from 'react-router';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const EditBand = ({ name, isJob }) => {
    const [open, setOpen] = React.useState(false);
    const [bandName, setBandName] = React.useState(name);
    const { _id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (isJob) {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/define',
                headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')},
                data: {
                    firstName: bandName,
                    jobId: _id
                }
            }).then(res => {
                console.log(res.data.band);
                window.location.reload(true);
            }).catch(err => {
                console.log(err);
            });
            setOpen(false);
        }
        else {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')},
                data: {
                    name: bandName,
                    bandId: _id
                }
            }).then(res => {
                console.log(res.data.band);
                window.location.reload(true);
            }).catch(err => {
                console.log(err);
            });
            setOpen(false);
        }

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
                <DialogContent style={{ padding: '15px', width: '400px' }}>
                    <Stack direction={'column'} spacing="15px">
                        <Stack spacing={'15px'} direction='row'>
                            <TextField
                                style={{ width: '100%' }}
                                id="band-name"
                                label={isJob ? "Заглавие" : "Име на банда"}
                                defaultValue={bandName}
                                onChange={e => {
                                    setBandName(e.target.value);
                                }}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Избери</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditBand;