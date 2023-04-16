import { Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, alpha } from "@mui/material";
import Slide from '@mui/material/Slide';
import { useState } from "react";
import { forwardRef } from "react";
import ChatIcon from '@mui/icons-material/Chat';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const MobileChatPopUp = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
                <IconButton onClick={() => setOpen(true)} sx={{marginLeft: '10px'}}>
                    { <ChatIcon fontSize="13px" /> }
                </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="Чат прозорец"
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

export default MobileChatPopUp;