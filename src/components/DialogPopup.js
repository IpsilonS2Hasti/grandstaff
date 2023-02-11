import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Chip, Grid, Stack, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchField from './SearchField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const DialogPopup = ({ data, selected }) => {
    const [selEls, setSelEls] = React.useState([...selected]);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setQuery(''), 300); //MIGHT BE BLOCKING CODE EXECUTION?
    };

    return (
        <div>
            <Stack direction='row' gap={'2px'} style={{flexWrap: 'wrap'}}>
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
                                                if(selEls.length >=5) return;
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
                    <Button onClick={handleClose}>Finish selection</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogPopup;