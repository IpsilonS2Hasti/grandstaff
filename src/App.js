import { Route, Routes } from "react-router";
import SearchAppBar from "./components/SearchAppBar";
import SideNav from "./components/SideNav";
import Find from "./pages/Find";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Box, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContextProvider } from "./context/ColorModeContext";
import { theme } from "./theme";
import Profile from "./pages/Profile";
import Band from "./pages/Band";


function App() {
  const [mode, setMode] = useState('light');

  const themeMemo = useMemo(
    () =>
      theme(mode),
    [mode],
  );

  return (
    <ColorModeContextProvider setMode={setMode}>
      <ThemeProvider theme={themeMemo}>
        <CssBaseline>
          <Box id="app" sx={{ backgroundColor: "background.paper" }}>
            <SearchAppBar />
            <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
              <SideNav />
              <Routes>
                <Route path="/find" element={<Find />} />{/* Make seperate find routes for the 3 types in the future?*/}
                <Route path="/discover" element={<Discover />} />
                <Route path="/concerts" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:uid" element={<Profile />} />
                <Route path="/band/:uid" element={<Band />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContextProvider>
  );
}

export default App;