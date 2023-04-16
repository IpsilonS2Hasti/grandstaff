import { SwipeableDrawer, alpha } from "@mui/material";
import { useState } from "react";
import ChatSideView from "./ChatSideView";

const MobileSideViewDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SwipeableDrawer
            anchor="right"
            open={isOpen}
            onClose={()=>setIsOpen(false)}
            onOpen={()=>setIsOpen(true)}
            PaperProps={{
                sx: {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "#00000000",
                    borderRadius: "16px 0 0 16px"
                },
            }}
        >
            <ChatSideView/>
        </SwipeableDrawer>
    );
}

export default MobileSideViewDrawer;