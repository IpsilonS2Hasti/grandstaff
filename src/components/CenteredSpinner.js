import { CircularProgress, Stack } from "@mui/material";

const CenteredSpinner = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            height="100%"
            >
            <CircularProgress />
        </Stack>
    );
}

export default CenteredSpinner;