import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Card, CardActionArea, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { chipData } from '../lib/chipData';
import DialogPopup from './DialogPopup';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const CreateJobPopup = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [name, setName] = React.useState();
    const [desc, setDesc] = React.useState();
    const [gsm, setGsm] = React.useState();
    const [email, setEmail] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createJob = () => {
        axios({
            method: 'put',
            url: 'https://grandstaff.herokuapp.com/api/signup',
            headers: {'Authorization': 'Bearer ' + (user ? user.token : '0')},
            data: {
                realUser: false,
                firstName: name,
                desc: desc,
                gsm: gsm,
                email: email,
                password: 'bettercallsaulgoodman',
                lastName: '',
                type: 'Employer',
                owner: user.userId
            }
        }).then(res => {
            navigate('/job/' + res.data.userId);
            handleClose();
        }) //sig 6e trqq timeout predi redirecta da moje backenda da syzdade bandata
    }


    return (
        <div>
            <Card sx={{ borderRadius: '10px', height: '183.6px' }}>
                <CardActionArea onClick={handleClickOpen} style={{ height: "100%" }}>
                    <Stack alignItems='center'>
                        <AddIcon fontSize="large" />
                        Създаване на нова обява
                    </Stack>
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Създаване на Обява"}
                </DialogTitle>
                <DialogContent style={{ padding: '15px', width: '400px' }}>
                    <Stack direction={'column'} spacing="15px">
                        <TextField
                            required
                            id="name"
                            label="Заглавие"
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                        <TextField
                            id="description"
                            label="Описание"
                            multiline
                            maxRows={9}
                            onChange={e => {
                                setDesc(e.target.value);
                            }}
                        />
                        <TextField
                            sx={{ width: '210px' }}
                            id="phone-number"
                            label="Телефонен номер"
                            onChange={e => {
                                setGsm(e.target.value);
                            }}
                        />
                        <TextField
                            id="contact-email"
                            label="Имейл за връзка"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Отказ</Button>
                    <Button onClick={createJob}>Създаване</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateJobPopup;