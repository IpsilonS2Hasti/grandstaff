import { Badge, Box, Card, CardActionArea, Chip, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const MemberTile = ({firstName, lastName, pfpUrl, instruments}) => {
    const navigate = useNavigate();
    return (
        <Card style={{backgroundColor: "#00000000"}} elevation="0" >
            <CardActionArea onClick={() => navigate('/profile/' + "profileID")}>
                <Box sx={{ width: '350px', display: 'flex', padding: '7.5px', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <Box style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${pfpUrl})`,
                        borderRadius: '20px',
                        height: '85px',
                        width: '85px',
                        marginRight: '12px',
                        flexShrink: 0
                    }} >
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="p" component="div" fontSize="18px">
                            {
                                firstName + " " + lastName
                            }

                        </Typography>
                        <Stack direction='row' gap={'2px'} flexWrap="wrap">
                            {instruments.map(instr => {
                                return (<Chip label={instr} />)
                            })}
                        </Stack>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default MemberTile;