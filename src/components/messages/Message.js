import { Box, Typography, alpha } from "@mui/material";

const Message = ({ content, timestamp, sender }) => {
    let isMe = sender == "";
    let curDay = new Date(Date.now());
    timestamp = timestamp == `${curDay.getDate()}-${curDay.getMonth() + 1}-${curDay.getFullYear()}` ?
        "Днес"
        : timestamp == `${curDay.getDate() - 1}-${curDay.getMonth() + 1}-${curDay.getFullYear()}` ?
            "Вчера"
            : timestamp;

    return (
        <Box sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: theme => alpha(theme.palette.background.paper, 0.57),
            width: "fit-content",
            maxWidth: "565px",
            margin: "15px",
            borderRadius: '16px',
            marginRight: !isMe ? "auto" : "15px",
            marginLeft: isMe ? "auto" : "15px",
        }}>
            <Box sx={{ padding: "12px", borderRadius: '16px', backgroundColor: isMe ? "rgba(255, 255, 255, 0.12)" : null }}>
                <Typography variant="p" component="div" fontSize="12px" style={{ opacity: "0.7" }}>
                    {sender !== "" ? sender : "Вие"} - {timestamp}
                </Typography>
                <Typography variant="p" component="div" fontSize="16px">
                    {content}
                </Typography>
            </Box>
        </Box>
    );
}

export default Message;