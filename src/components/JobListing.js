import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const JobListing = ({ name, desc, image, instruments, genres }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: '8px', backgroundColor: '#F9FBFF' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={image}
            />
            <CardContent>
                <Stack direction='row' spacing={'2px'}>
                    {instruments.map(instr => <Chip label={instr} />)}
                </Stack>
                <Box sx={{ height: '5px' }} />
                <Stack direction='row' spacing={'2px'}>
                    {genres.map(genre => <Chip label={genre} />)}
                </Stack>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More Information</Button>
            </CardActions>
        </Card>
    );
}

export default JobListing;