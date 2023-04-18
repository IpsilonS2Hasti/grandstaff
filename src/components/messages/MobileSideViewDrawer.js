import { SwipeableDrawer, alpha } from "@mui/material";
import { useState } from "react";
import ChatSideView from "./ChatSideView";
import { useContext } from "react";
import { createContext } from "react";

export const MobileDrawerContext = createContext();

export const MobileDrawerContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <MobileDrawerContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </MobileDrawerContext.Provider>
    );
};

const MobileSideViewDrawer = () => {
    const {isOpen, setIsOpen} = useContext(MobileDrawerContext);

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