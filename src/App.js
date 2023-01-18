import { Route, Routes } from "react-router";
import SearchAppBar from "./components/SearchAppBar";
import SideNav from "./components/SideNav";
import Find from "./pages/Find";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div id="app" style={{  backgroundColor: "#f6f8fc" }}>
      <SearchAppBar />
      <div style={{display: 'flex', height: 'calc(100vh - 65px)'}}>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Find />} />
          <Route path="/concerts" element={<Home />} />
          <Route path="/band" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;