import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/StudentList";
import Leave from "./pages/Leave/LeavePage";
import Fees from "./pages/Fee/FeePage";
import Workers from "./pages/Workers/WorkerPage";
import Expenses from "./pages/Expenses/ExpenseList";
import Attendance from "./pages/Attendance/AttendancePage";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN WITHOUT SIDEBAR */}
        <Route path="/" element={<Login />} />

        {/* ALL PAGES WITH SIDEBAR */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Students /></Layout>} />
        <Route path="/leave" element={<Layout><Leave /></Layout>} />
        <Route path="/fees" element={<Layout><Fees /></Layout>} />
        <Route path="/workers" element={<Layout><Workers /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;