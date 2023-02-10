import { Box } from "@mui/material";
import BandTile from "./BandTile";

const BandStack = () => {
    return (
        <Box sx={{ position: 'fixed', overflowY: 'auto', height: {xl: 'calc(100% - 430px)', lg: 'calc(100% - 330px)'}, lineHeight: 'normal' }}>
            {[1, 2, 3, 4, 5].map(
                () => <BandTile/>
            )}
        </Box >


    );
}

export default BandStack;