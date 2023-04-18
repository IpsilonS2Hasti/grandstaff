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
import Job from "./pages/Job";
import Resetpass from "./pages/Resetpass";
import Forgotpass from "./pages/Forgotpass";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import Concerts from "./pages/Concerts";
import Messages from "./pages/Messages";
import { MobileDrawerContextProvider } from "./components/messages/MobileSideViewDrawer";

function App() {
  const [mode, setMode] = useState('dark');

  const themeMemo = useMemo(
    () =>
      theme(mode),
    [mode],
  );

  return (
    <ColorModeContextProvider setMode={setMode}>
      <ThemeProvider theme={themeMemo}>
        <CssBaseline>
          <HMSRoomProvider>
            <MobileDrawerContextProvider>
              <Box id="app" sx={{ backgroundColor: "background.paper" }}>
                <SearchAppBar />
                <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
                  <SideNav />
                  <Routes>
                    <Route path="/find" element={<Find />} />
                    <Route path="/" element={<Discover />} />
                    <Route path="/concerts" element={<Concerts />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:chatUid" element={<Messages />} />
                    <Route path="/band/:_id" element={<Band />} />
                    <Route path="/job" element={<Find />} />
                    <Route path="/job/:_id" element={<Job />} />
                    <Route path="/profile/:_id" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/resetpass" element={<Resetpass />} />
                    <Route path="/forgotpass" element={<Forgotpass />} />
                  </Routes>
                </div>
              </Box>
            </MobileDrawerContextProvider>
          </HMSRoomProvider>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContextProvider>
  );
}

export default App;