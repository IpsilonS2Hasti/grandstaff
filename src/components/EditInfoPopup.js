import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Stack, alpha } from '@mui/system';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { EntityContext } from '../context/EntityContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const EditInfoPopup = () => {
    const { desc, uniEd, gsm, contactEmail, userId, type, _id, setEntityState } = React.useContext(EntityContext);
    const [open, setOpen] = React.useState(false);
    const [vuz, setVuz] = React.useState(uniEd);
    const [descr, setDescr] = React.useState(desc);
    const [phone, setPhone] = React.useState(gsm);
    const [mail, setMail] = React.useState(contactEmail);
    const [error, setError] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setVuz(uniEd);
        setDescr(desc);
        setPhone(gsm);
        setMail(contactEmail);
        setOpen(false);
    };

    const submit = () => {
        console.log(_id);
        const user = JSON.parse(localStorage.getItem('user'));
        if (type === "Band") {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                data: {
                    desc: descr,
                    gsm: phone,
                    contactEmail: mail,
                    bandId: _id
                }
            }).then(res => {
                setEntityState(prev => ({
                    ...prev,
                    desc: descr,
                    gsm: phone,
                    contactEmail: mail,
                    uniEd: vuz,
                }));
                setOpen(false);
            }).catch(err => {
                setError(err.response.data.message);
                setOpen(true);
            });
        } else {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/define',
                headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                data: {
                    uniEd: vuz,
                    desc: descr,
                    gsm: phone,
                    contactEmail: mail,
                    jobId: _id
                }
            }).then(res => {
                setEntityState(prev => ({
                    ...prev,
                    desc: descr,
                    gsm: phone,
                    contactEmail: mail,
                    uniEd: vuz,
                }));
                setOpen(false);
            }).catch(err => {
                setError(err.response.data.message);
                setOpen(true);
            });
        }

    };


    return (
        <div>
            <IconButton onClick={handleClickOpen} >
                <Edit />
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
                    {"Редакция на данни"}
                </DialogTitle>
                <DialogContent sx={{ padding: '15px', width: {lg: '400px', xs: 'calc(100vw - 64px)'} }}>
                    <Stack direction={'column'} spacing="15px">
                        {
                            type==="Band"
                                ?
                                null
                                :
                                type==="Job" ?
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Търся:</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={vuz}
                                            name="vuz"
                                            id="vuz"
                                            onChange={e => {
                                                if (e.target.value !== 'Висшисти') {
                                                    setVuz('Undefined');
                                                }
                                                else setVuz('Висшисти');
                                            }}
                                        >
                                            <FormControlLabel value="Висшисти" control={<Radio />} label="Висшисти" />
                                            <FormControlLabel value="Всички" control={<Radio />} label="Всички" />
                                        </RadioGroup>
                                    </FormControl>
                                    :
                                    <TextField
                                        id="vuz"
                                        label="Висше учебно заведение"
                                        defaultValue={vuz}
                                        onChange={e => setVuz(e.target.value)}
                                    />
                        }
                        <TextField
                            id="description"
                            label="Описание"
                            multiline
                            minRows={4}
                            maxRows={9}
                            defaultValue={descr}
                            onChange={e => setDescr(e.target.value)}
                        />
                        <TextField
                            sx={{ width: '210px' }}
                            id="phone-number"
                            label="Телефонен номер"
                            defaultValue={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <TextField
                            id="contact-email"
                            label="Имейл за връзка"
                            defaultValue={mail}
                            onChange={e => setMail(e.target.value)}
                            helperText="(Това променя само имейла, който виждат другите, а не този, с който се вписвате.)"
                        />
                    </Stack>
                </DialogContent>
                <Typography color={"red"}>
                    { error }
                </Typography>
                <DialogActions>
                    <Button onClick={handleClose}>Затвори</Button>
                    <Button onClick={submit}>Запази</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditInfoPopup;