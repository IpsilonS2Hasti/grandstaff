import { createTheme } from "@mui/material";

export const theme = mode => {
    if(mode==='light') return createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: "#1D2B53",
            },
            background: {
                paper: '#F6F8FC',
                default: '#FFF'
            }
        }
    })
    if(mode==='dark') return createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#FCAE1A"
            },
            background: {
                paper: '#1E1E1E',
                default: '#121212'
            }
        }
    })
}