import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Chip, Grid, Stack, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import SearchField from './SearchField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ChipSelectPopup = ({ selEls, setSelEls, data }) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const labelName = () => {
        if (selEls.length == 0) return data.chipName;
        if (selEls.length == 1) return <p><b>{`${data.chipName}: `}</b> {selEls[0]}</p>;
        if (selEls.length > 1) return <p><b>{`${data.chipName}: `}</b>  {selEls[0]} + {(selEls.length - 1)}</p>;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        searchParams.delete(data.queryParam);
        selEls.forEach(el => (
            searchParams.append(data.queryParam, el)
        ));
        setSearchParams(searchParams); //Change to functional if problems arise
        setTimeout(() => setQuery(''), 300); //MIGHT BE BLOCKING CODE EXECUTION?
    };

    return (
        <div>
            <Chip label={labelName()}
                onClick={handleClickOpen}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', color: '#fff', [':hover']: { backgroundColor: 'rgba(255, 255, 255, 0.24)' } }}
            />
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
                                                else setSelEls([...selEls, el]);
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

export default ChipSelectPopup;