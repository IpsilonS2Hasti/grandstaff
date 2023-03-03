import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { chipData } from '../lib/chipData';
import DialogPopup from './DialogPopup';
import { useNavigate } from 'react-router';
import BandTile from './BandTile';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const AddToBand = (userId) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    let userItem = JSON.parse(localStorage.getItem('user'));
    if (!userItem) userItem = {userId: '0', token: '0'};
    const { data, loading, error } = useFetch('https://grandstaff.herokuapp.com/api/getUser/' + userItem.userId);
    let user;
    let bands;
    if (!loading) { 
        user = data.user; 
        bands = (user ? user.bands : []); 
        console.log(data);
    }
    console.log(bands);

    const [dataM, setData] = React.useState([]);
    React.useEffect(() => {
        axios({
            method: 'post',
            url: 'https://grandstaff.herokuapp.com/api/band/getBands',
            data: {
                bandIds: bands
            }
        }).then(res => {
            setData(res.data.bands)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            console.log(dataM);
        });
    }, [open]);
    // const data = [
    //     {
    //         name: "Орк. Оргримарски Орки",
    //         pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //         genres: [
    //             "Чалга",
    //             "Маками"
    //         ],
    //         memberCount: "7"
    //     },
    //     {
    //         name: "Орк. Глупаците от Долнаaaa Джумая",
    //         pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //         genres: [
    //             "Чалга",
    //             "Маками"
    //         ],
    //         memberCount: "7"
    //     },
    //     {
    //         name: "Орк. Bruh",
    //         pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
    //         genres: [
    //             "Чалга",
    //             "Маками"
    //         ],
    //         memberCount: "7"
    //     },
    // ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBand = () => {
        console.log("BAND CREAYDRTYFEED!!!!!");
        navigate('/band/' + "bandID") //sig 6e trqq timeout predi redirecta da moje backenda da syzdade bandata
        handleClose();
    }


    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <GroupAddIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex' }}>
                    {"Добавяне към Група"}
                </DialogTitle>
                <Stack direction={'column'} width={"400px"}>
                    {dataM.map(el => {
                        return <BandTile {...el} addMode userId={userId} />
                    })}
                </Stack>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Отказ</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddToBand;
