import { alpha, Box, Card, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import ScheduleCalendar from "./ScheduleCalendar";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import BandStack from "./BandStack";
import SchoolIcon from '@mui/icons-material/School';
import EditInfoPanel from "./EditInfoPopup";

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

const InfoPanel = ({ desc, phone, contactEmail, uEdu, editView }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ position: 'relative', backgroundColor: 'background.paper', marginLeft: '25px', borderRadius: '10px', height: { xl: '95%', lg: '100%' }, width: '350px', backdropFilter: 'blur(10px)', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
            <Box sx={{ overflowY: 'auto', padding: '15px', height: { xl: '300px', lg: '200px' }, lineHeight: 'normal' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <b>ABOUT: </b>
                    {editView ?
                        <EditInfoPanel {...{desc, phone, contactEmail, uEdu,}}/>
                        :
                        null
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: '0.7' }}>
                    <SchoolIcon fontSize="small" />
                    <Box width="5px" />
                    <Typography variant="p" component="p" marginTop='5px'>Джаггар Дурмонлъ Университет</Typography>
                </div>
                <Typography variant="p" component="p" fontSize="16px" marginTop='5px'>{desc}</Typography>
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
                    <Typography variant="p" component="div" fontSize="16px">ilhan@peder.tr</Typography>
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