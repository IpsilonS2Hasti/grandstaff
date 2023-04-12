import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";

const ChatPreview = ({ firstName, lastName, pfpUrl, lastMsg, _id }) => {
    let { chatUid } = useParams();
    const navigate = useNavigate();
    return (
        <Card style={{ backgroundColor: "#00000000" }} elevation="0" >
            <CardActionArea onClick={() => navigate('/messages/' + _id)} sx={{
                backgroundColor: chatUid === _id ? "rgba(255, 255, 255, 0.12)" : null
            }}>
                <Box sx={{ width: '350px', display: 'flex', padding: '12px', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <Box style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${pfpUrl})`,
                        borderRadius: '20px',
                        height: '75px',
                        width: '75px',
                        marginRight: '12px',
                        flexShrink: 0
                    }} >
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="p" component="div" fontSize="18px">
                            {firstName + " " + lastName}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div" fontSize="14px" style={{
                            opacity: 0.7,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}>
                        {lastMsg}
                    </Typography>
                </Box>
            </Box>
        </CardActionArea>
        </Card >
    );
}

export default ChatPreview;