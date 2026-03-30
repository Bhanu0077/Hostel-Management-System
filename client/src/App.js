import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import OTPVerify from "./pages/Auth/OTPVerify";
import SetPassword from "./pages/Auth/SetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentList from "./pages/Students/StudentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<OTPVerify />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;