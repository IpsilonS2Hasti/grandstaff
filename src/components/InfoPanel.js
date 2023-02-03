import { Box, Card, Divider, Typography } from "@mui/material";

const InfoPanel = ({ desc }) => {
    return (
        <Card sx={{ backgroundColor: 'background.paper', marginLeft: '25px', borderRadius: '10px', height: '400px', width: '300px' }}>
            <Box sx={{padding: '15px', height: '40%', lineHeight: 'normal'}}>
                <Typography variant="p" component="p">{desc}</Typography>
            </Box>
            <Divider />
        </Card>
    );
}

export default InfoPanel;