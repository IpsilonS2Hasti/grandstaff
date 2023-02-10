import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Box } from '@mui/system';

import { Button, Stack, styled } from '@mui/material';

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

const PfpUpload = () => {
    return (
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', width: '100%' }}>
            <HoverEffect>
                <Stack direction='row' style={{ width: '100%', height: '100%', position: 'absolute', zIndex: '3', justifyContent: 'center', alignItems: 'center' , pointerEvents: 'none' }}>
                    <InsertPhotoIcon fontSize="large" />
                </Stack>
                <Button key="one" component='label' style={{ borderBottom: 0, height: '100%', width: "100%" }}><input hidden accept="image/*" type="file" onChange={() => { }} /></Button>
            </HoverEffect>
        </div>
    );
}

export default PfpUpload;