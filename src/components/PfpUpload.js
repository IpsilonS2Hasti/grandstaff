import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Box } from '@mui/system';

import { Button, Stack, styled } from '@mui/material';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import { useContext } from 'react';
import { EntityContext } from '../context/EntityContext';

const HoverEffect = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#00000055',
    width: '100%',
    height: '100%',
    opacity: 0,
    '&:hover': {
        opacity: '0.7',
    }
}));

// const changePfp = e => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('pfpPicker', file);
//     axios({
//         method: "post",
//         url: `https://grandstaff.herokuapp.com/api/media/addMedia/${user.token}`,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//         .then(function (response) {
//             console.log(response);
//             window.location.reload(true);
//         })
// };

const PfpUpload = () => {
    const { _id } = useParams();
    // console.log(_id);
    const { pathname } = useLocation();
    let inBand = false;
    if (pathname.includes('/band')) inBand = true;
    //console.log(inBand);
    const {setEntityState} = useContext(EntityContext);
    return (
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', width: '100%' }}>
            <HoverEffect>
                <Stack direction='row' style={{ width: '100%', height: '100%', position: 'absolute', zIndex: '3', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                    <InsertPhotoIcon fontSize="large" />
                </Stack>
                <Button key="one" component='label' style={{ borderBottom: 0, height: '100%', width: "100%" }}><input hidden accept="image/*" type="file" onChange={e => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    const file = e.target.files[0];
                    const formData = new FormData();
                    formData.append('pfpPicker', file);
                    axios({
                        method: "post",
                        url: inBand ? `https://grandstaff.herokuapp.com/api/media/addMediaBand/${user.token}/${_id}` : `https://grandstaff.herokuapp.com/api/media/addMedia/${user.token}`,
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                        .then(function (response) {
                            console.log(response);
                            setEntityState(prev => ({ //TODO
                                ...prev,
                                pfpUrl: `https://grandstaff.herokuapp.com/images/${response.data.fileNameExt}`, //set to whatever's saved in the server
                            }));
                        })
                }} /></Button>
            </HoverEffect>
        </div>
    );
}

export default PfpUpload;