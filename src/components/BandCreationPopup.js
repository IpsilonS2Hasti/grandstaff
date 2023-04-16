import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Stack, alpha } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { chipData } from '../lib/chipData';
import DialogPopup from './DialogPopup';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const BandCreationPopup = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [name, setName] = React.useState();
    const [desc, setDesc] = React.useState();
    //const [genres, setGenres] = React.useState();
    const [gsm, setGsm] = React.useState();
    const [email, setEmail] = React.useState();
    const [instr, setInstr] = React.useState([]);
    const [genre, setGenre] = React.useState([]);
    const [error, setError] = React.useState('');

    console.log('name', name);
    console.log('desc', desc);
    //console.log('genres', genres);
    console.log('gsm', gsm);
    console.log('email', email);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBand = () => {
        console.log("GENRE", genre);
        console.log("INSTR", instr);
        axios({
            method: 'put',
            url: 'https://grandstaff.herokuapp.com/api/band/createBand',
            headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')},
            data: {
                name: name,
                desc: desc,
                gsm: gsm,
                contactEmail: email,
                instr: instr,
                genre: genre
            }
        }).then(res => {
            navigate('/band/' + res.data.band._id);
            setOpen(false);
        }).catch(err => {
            setError(err.response.data.message);
            setOpen(true);
        });
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        backdropFilter: 'blur(10px)',
                        backgroundColor: theme => alpha(theme.palette.background.paper, 0.67),
                        borderRadius: "16px"
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Създаване на Група"}
                </DialogTitle>
                <DialogContent sx={{ padding: '15px', width: {lg: '400px', xs: 'calc(100vw - 64px)'} }}>
                    <Stack direction={'column'} spacing="15px">
                        <TextField
                            required
                            id="name"
                            label="Име на група"
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                        <Stack direction={"row"}>
                            <Typography variant='p' fontSize="15px" marginTop="4px">{"Инстр.:"}</Typography>
                            <Box width="5px" />
                            <DialogPopup data={chipData[1]} selected={[]} type="Job" externalSetState={setInstr} />
                        </Stack>
                        <Stack direction={"row"}>
                            <Typography variant='p' fontSize="15px" marginTop="4px">{"Жанр:"}</Typography>
                            <Box width="5px" />
                            <DialogPopup data={chipData[2]} selected={[]} type="Job" externalSetState={setGenre} />
                        </Stack>
                        <TextField
                            id="description"
                            label="Описание"
                            multiline
                            minRows={4}
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
                <Typography color={"red"}>
                    { error }
                </Typography>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Отказ</Button>
                    <Button onClick={createBand}>Създаване</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BandCreationPopup;