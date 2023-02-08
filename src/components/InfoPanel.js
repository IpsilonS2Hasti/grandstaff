import { alpha, Box, Card, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import ScheduleCalendar from "./ScheduleCalendar";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import BandStack from "./BandStack";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const InfoPanel = ({ desc, editView }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ position: 'relative', backgroundColor: 'background.paper', marginLeft: '25px', borderRadius: '10px', height: '92.5%', width: '350px', backdropFilter: 'blur(10px)', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
            <Box sx={{ overflowY: 'auto', padding: '15px', height: { xl: '300px', lg: '200px' }, lineHeight: 'normal' }}>
                <b>ABOUT:</b>
                <Typography variant="p" component="p" marginTop='5px'>{desc}</Typography>
            </Box>
            <Divider />
            <Stack direction={'column'} justifyContent='center' alignItems="center" height="80px">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <PhoneIcon />
                    <Box width="5px" />
                    <Typography variant="h5" component="div"><b>088 1488 1488</b></Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <EmailIcon fontSize="16px" />
                    <Box width="5px" />
                    <Typography variant="p" component="div" fontSize="16px">  ilhan@peder.tr</Typography>
                </div>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent='center'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Schedule" />
                    <Tab label="Bands" />
                </Tabs>
            </Stack>
            <TabPanel value={value} index={0}>
                <ScheduleCalendar editView={editView} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BandStack />
            </TabPanel>
        </Card>
    );
}

export default InfoPanel;