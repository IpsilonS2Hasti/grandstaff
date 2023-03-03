import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { alpha, Chip, Grid, Stack, Typography } from '@mui/material';
import { useParams, useSearchParams } from "react-router-dom";
import SearchField from './SearchField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const EditRegionPopup = ({ data, initSel, isBand }) => {
    const [selEl, setSelEl] = React.useState(initSel);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (isBand) {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')},
                data: {
                    city: selEl,
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
                headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')},
                data: {
                    city: selEl,
                    jobId: _id
                }
            }).then(res => {
                console.log(res.data.user);
            }).catch(err => {
                console.log(err);
            });
        }
        setOpen(false);
        setTimeout(() => setQuery(''), 300);
    };

    return (
        <div>
             <Chip icon={<LocationOnIcon fontSize='small' />} label={selEl} onClick={handleClickOpen}/>
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
                                    return (
                                        <Grid item>
                                            <Chip label={el} color={el===selEl ? 'primary' : 'default'} onClick={() => setSelEl(el)} />
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

export default EditRegionPopup;