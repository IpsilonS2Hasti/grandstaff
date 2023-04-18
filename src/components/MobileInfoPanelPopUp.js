import { Button, Dialog, DialogActions, DialogTitle, Stack, alpha } from "@mui/material";
import Slide from '@mui/material/Slide';
import { useState } from "react";
import { forwardRef } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const MobileInfoPanelPopUp = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Stack direction="row" justifyContent="center" paddingBottom="40px">
                <Button startIcon={<ExpandLessIcon style={{marginTop: "-1px"}}/>} style={{borderRadius: "10px"}} onClick={() => setOpen(true)}>Покажи Информация</Button>
            </Stack>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="Информационен панел"
                PaperProps={{
                    sx: {
                        backgroundColor: "#00000000",
                        borderRadius: "16px",
                    },
                }}
            >

                {children}

            </Dialog>
        </div>
    );
}

export default MobileInfoPanelPopUp;