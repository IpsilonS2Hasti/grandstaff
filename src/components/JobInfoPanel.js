import { alpha, Box, Card, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import ScheduleCalendar from "./ScheduleCalendar";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import InfoStack from "./InfoStack";
import SchoolIcon from '@mui/icons-material/School';
import EditInfoPanel from "./EditInfoPopup";
import PreviewCarousel from "./PreviewCarousel";
import { findData } from "../lib/discoveryData";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ height: "100%", width: "700px" }}
        >
            {value === index && (
                <Box height={"100%"} width={"700px"}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const JobInfoPanel = ({ desc, phone, contactEmail, uEdu, previews, uid, editView, isBand }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ position: 'relative', backgroundColor: 'background.paper', borderRadius: '10px', height: "490px", width: '700px', backdropFilter: 'blur(10px)', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
            <Stack direction={'row'} justifyContent='center' alignItems="center" height="50px" marginTop="8px"  marginBottom='-8px'  >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <PhoneIcon />
                    <Box width="5px" />
                    <Typography variant="h5" component="div"><b>088 1488 1488</b></Typography>
                </div>
                <Box width="25px" />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <EmailIcon fontSize="16px" />
                    <Box width="5px" />
                    <Typography variant="p" component="div" fontSize="16px">ilhan@peder.tr</Typography>
                </div>
            </Stack>
            <Stack direction="row" justifyContent='center'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Schedule" />
                    <Tab label="Media" />
                </Tabs>
            </Stack>
            <Divider />
            <TabPanel value={value} index={0}>
                <Stack direction={"row"} height="100%">
                    <Box sx={{ overflowY: 'auto', padding: '15px', height: '100%', width: '350px', lineHeight: 'normal' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b>ABOUT: </b>
                            {editView ?
                                <EditInfoPanel {...{ desc, phone, contactEmail, uEdu, isBand }} />
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
                    <Divider orientation='vertical' />
                    <Stack direction="column" height='100%' width='350px'>
                        <ScheduleCalendar editView={editView} />
                    </Stack>
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box padding="15px 35px 0 35px">
                    <PreviewCarousel previews={previews} uid={uid} miniMode />
                </Box>
            </TabPanel>
        </Card>
    );
}

export default JobInfoPanel;