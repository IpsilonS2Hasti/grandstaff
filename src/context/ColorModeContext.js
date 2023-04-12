import { createContext, useMemo } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const ColorModeContextProvider = ({ children, setMode }) => {
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            {children}
        </ColorModeContext.Provider>
    );
};