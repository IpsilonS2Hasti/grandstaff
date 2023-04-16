import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { alpha, Box, Chip, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useParams, useSearchParams } from "react-router-dom";
import SearchField from './SearchField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { EntityContext } from '../context/EntityContext';
import { useContext } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const EditRegionPopup = ({ data }) => {
    const { city, type, setEntityState } = useContext(EntityContext);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = useParams();

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (type === "Band") {
            axios({
                method: 'patch',
                url: 'https://grandstaff.herokuapp.com/api/band/editBand',
                headers: { 'Authorization': 'Bearer ' + (user != null ? user.token : '0') },
                data: {
                    city: city,
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
                    city: city,
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
            <Chip icon={<LocationOnIcon fontSize='small' />} label={city} onClick={handleClickOpen} />
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
                    {data.title}
                    {isMobile ? null : <SearchField onChange={e => setQuery(e.target.value)} value={query} />}
                </DialogTitle>
                {isMobile ? <Box padding="0 15px"><SearchField onChange={e => setQuery(e.target.value)} value={query} /></Box> : null}
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={'5px'}>
                            {
                                data.content.map(el => {
                                    if (!el.toLowerCase().includes(query.toLowerCase())) return;
                                    return (
                                        <Grid item>
                                            <Chip label={el} color={el === city ? 'primary' : 'default'} onClick={() => setEntityState(prev => ({ ...prev, city: el }))} />
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