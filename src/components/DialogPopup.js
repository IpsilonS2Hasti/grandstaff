import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { chipData } from "../lib/chipData";
import { Chip, Grid, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchField from './SearchField';
import axios from 'axios';
import { useParams } from 'react-router';
import { EntityContext } from '../context/EntityContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const DialogPopup = ({ data, selected, type, externalSetState }) => {
    const context = React.useContext(EntityContext);
    type = context ? context.type : type; //For external setState
    const [selEls, setSelEls] = React.useState([...selected]);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (externalSetState) { //For external setState
            externalSetState(selEls);
            setOpen(false);
            setTimeout(() => setQuery(''), 300);
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (data.chipName === 'Инструмент') {
            if (type === "Band") {
                axios({
                    method: 'patch',
                    url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                    headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                    data: {
                        instruments: selEls,
                        bandId: _id
                    }
                }).then(res => {
                    console.log(res.data.band);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios({
                    method: 'patch',
                    url: 'https://grandstaff.herokuapp.com/api/define',
                    headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                    data: {
                        instruments: selEls,
                        jobId: _id
                    }
                }).then(res => {
                    console.log(res.data.user);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        if (data.chipName === 'Жанр') {
            if (type === "Band") {
                axios({
                    method: 'patch',
                    url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                    headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                    data: {
                        genres: selEls,
                        bandId: _id
                    }
                }).then(res => {
                    console.log(res.data.band);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios({
                    method: 'patch',
                    url: 'https://grandstaff.herokuapp.com/api/define',
                    headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                    data: {
                        genres: selEls,
                        jobId: _id
                    }
                }).then(res => {
                    console.log(res.data.user);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        setOpen(false);
        setTimeout(() => setQuery(''), 300);
    };

    return (
        <div>
            <Stack direction='row' gap={'2px'} style={{ flexWrap: 'wrap' }}>
                {selEls.map(el => <Chip label={el} />)}
                <IconButton size="small" onClick={handleClickOpen}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {data.title}
                    <SearchField onChange={e => setQuery(e.target.value)} value={query} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={'5px'}>
                            {
                                data.content.map(el => {
                                    if (!el.toLowerCase().includes(query.toLowerCase())) return;
                                    let inArr = false;
                                    if (selEls.includes(el)) inArr = true;
                                    return (
                                        <Grid item>
                                            <Chip label={el} color={inArr ? 'primary' : 'default'} onClick={() => {
                                                if (inArr) setSelEls(selEls.filter(instr => instr !== el));
                                                if (selEls.length >= 5) return;
                                                if (!inArr) setSelEls([...selEls, el]);
                                            }} />
                                        </Grid>
                                    )
                                })

                            }
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Избери</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogPopup;