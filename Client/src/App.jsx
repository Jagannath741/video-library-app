import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "../components/UserLogin";
import { UserRegister } from "../components/UserRegister";
import { UserDashBoard } from "../components/UserDashboard";
import { AdminLogin } from "../components/AdminLogin";
import { AdminDashboard } from "../components/AdminDashboard";
import { AdminAddVideo } from "../components/AdminAddVideo";
import { AdminEditVideo } from "../components/AdminEditVideo";
import { AdminDeleteVideo } from "../components/AdminDeleteVideo";
import { VideoHome } from "../components/VideoHome";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoHome />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/user-dashboard" element={<UserDashBoard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-video" element={<AdminAddVideo />} />
          <Route path="/edit-video/:id" element={<AdminEditVideo />} />
          <Route path="/delete-video/:id" element={<AdminDeleteVideo />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
