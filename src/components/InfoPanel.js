import { Box, Card, Divider, Typography } from "@mui/material";
import ScheduleCalendar from "./ScheduleCalendar";

const InfoPanel = ({ desc, editView }) => {
    return (
        <Card sx={{ position: 'relative', backgroundColor: 'background.paper', marginLeft: '25px', borderRadius: '10px', height: '90%', width: '300px' }}>
            <Box sx={{ padding: '15px', height: '46%', lineHeight: 'normal' }}>
                <b>ABOUT:</b>
                <Typography variant="p" component="p" marginTop='5px'>{desc}</Typography>
            </Box>
            <Divider />
            <ScheduleCalendar editView={editView}/>
        </Card>
    );
}

export default InfoPanel;