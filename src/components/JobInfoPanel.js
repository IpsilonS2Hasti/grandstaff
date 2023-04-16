import { alpha, Box, Card, Divider, Stack, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import ScheduleCalendar from "./ScheduleCalendar";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import InfoStack from "./InfoStack";
import SchoolIcon from '@mui/icons-material/School';
import EditInfoPopup from "./EditInfoPopup";
import PreviewCarousel from "./PreviewCarousel";
import { findData } from "../lib/discoveryData";
import EditPreviewCarousel from "./EditPreviewCarousel";
import { useContext } from "react";
import { EntityContext } from "../context/EntityContext";

const JobInfoPanel = () => {
    const { desc, gsm, contactEmail, uniEd, previews, _id, editView } = useContext(EntityContext);
    const [value, setValue] = useState(0);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                style={{ height: "100%", width: isMobile ? '100%' : '700px' }}
            >
                {value === index && (
                    <Box height={"100%"} width={isMobile ? '100%' : '700px'}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ marginLeft: "15px", marginRight: "15px", position: 'relative', backgroundColor: 'background.paper', borderRadius: '10px', height: "490px", width: isMobile ? 'calc(100% - 30px)' : '700px', backdropFilter: 'blur(10px)', backgroundColor: theme => alpha(theme.palette.background.paper, 0.57) }}>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent='center' alignItems="center" height="50px" marginTop="8px" marginBottom='-8px'  >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <PhoneIcon />
                    <Box width="5px" />
                    <Typography variant="h5" component="div"><b>{gsm}</b></Typography>
                </div>
                <Box width="25px" />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <EmailIcon fontSize="16px" />
                    <Box width="5px" />
                    <Typography variant="p" component="div" fontSize="16px">{contactEmail}</Typography>
                </div>
            </Stack>
            <Stack direction="row" justifyContent='center'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    {isMobile ? <Tab label="Информ." /> : null}
                    <Tab label="График" />
                    <Tab label="Медии" />
                </Tabs>
            </Stack>
            <Divider />
            {isMobile ? <TabPanel value={value} index={0}> {/* Information panel for mobile */}
                <Box sx={{ overflowY: 'auto', padding: '15px', height: '100%', width: '100%', lineHeight: 'normal' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Информация: </b>
                        {editView ?
                            <EditInfoPopup /> //REWIRED
                            :
                            null
                        }
                    </div>
                    {uniEd !== 'Undefined' ?
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: '0.7' }}>
                            <SchoolIcon fontSize="small" />
                            <Box width="5px" />
                            <Typography variant="p" component="p" marginTop='5px'>{uniEd}</Typography>
                        </div> : null
                    }
                    <Typography variant="p" component="p" fontSize="16px" marginTop='5px'>{desc}</Typography>
                </Box>
            </TabPanel> : null}
            <TabPanel value={value} index={isMobile ? 1 : 0}>
                <Stack direction={"row"} height="100%">
                    {!isMobile ? <> {/* Information section for desktop */}
                        <Box sx={{ overflowY: 'auto', padding: '15px', height: '100%', width: '350px', lineHeight: 'normal' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <b>Информация: </b>
                                {editView ?
                                    <EditInfoPopup /> //REWIRED
                                    :
                                    null
                                }
                            </div>
                            {uniEd !== 'Undefined' ?
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: '0.7' }}>
                                    <SchoolIcon fontSize="small" />
                                    <Box width="5px" />
                                    <Typography variant="p" component="p" marginTop='5px'>{uniEd}</Typography>
                                </div> : null
                            }
                            <Typography variant="p" component="p" fontSize="16px" marginTop='5px'>{desc}</Typography>
                        </Box>
                        <Divider orientation='vertical' />
                    </> : null}
                    <Stack direction="column" height='100%' width='350px'>
                        <ScheduleCalendar /> {/* REWIRED */}
                    </Stack>
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={isMobile ? 2 : 1}>
                <Box padding={isMobile ? "15px 0 0 0" : "15px 35px 0 35px"}>
                    {editView ?
                        <EditPreviewCarousel miniMode /> //REWIRED + WIP
                        :
                        <PreviewCarousel miniMode /> //REWIRED
                    }
                </Box>
            </TabPanel>
        </Card>
    );
}

export default JobInfoPanel;