import { Badge, Box, Typography } from "@mui/material";

const BandStack = () => {
    return (
        <Box sx={{ overflowY: 'auto', padding: '15px', height: 'calc(79vh - 430px)', lineHeight: 'normal' }}> {/*HEIGHT ISSUE!*/}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Typography gutterBottom variant="h6" component="div">
                    {
                        "Орк. Ляво мъдо на гръба му"
                    }

                </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Typography gutterBottom variant="h6" component="div">
                    {
                        "Орк. Ляво мъдо на гръба му"
                    }

                </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Typography gutterBottom variant="h6" component="div">
                    {
                        "Орк. Ляво мъдо на гръба му"
                    }

                </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Typography gutterBottom variant="h6" component="div">
                    {
                        "Орк. Ляво мъдо на гръба му"
                    }

                </Typography>
            </div>
        </Box >


    );
}

export default BandStack;