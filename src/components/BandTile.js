import { Badge, Box, Typography } from "@mui/material";

const BandTile = () => {
    return (
        <Box sx={{ width: '333px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '7.5px 15px 7.5px 15px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', [":hover"]:{cursor: 'pointer'} }} onClick={() => console.log("bob")}>
            <Box style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${"https://cdn.discordapp.com/attachments/802212627405078578/1072580934819393586/Charles_Mingus_1976_cropped.png"})`,
                borderRadius: '20px',
                height: '85px',
                width: '85px',
                marginRight: '15px',
                flexShrink: 0
            }} >
                <Badge badgeContent={8} color="primary"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <Box style={{ width: '70px', height: '70px' }} />
                </Badge>
            </Box>
            <Typography gutterBottom variant="h6" component="div" fontSize="19px">
                {
                    "Орк. Ляво мъдо на"
                }

            </Typography>
        </Box>
    );
}

export default BandTile;