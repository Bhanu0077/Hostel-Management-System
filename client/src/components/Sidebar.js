import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div style={{
            width: "200px",
            height: "100vh",
            background: "#1e293b",
            color: "white",
            padding: "20px"
        }}>
            <h3>HMS</h3>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link to="/dashboard" style={link}>Dashboard</Link></li>
                <li><Link to="/students" style={link}>Students</Link></li>
                <li><Link to="/leave" style={link}>Leave</Link></li>
                <li><Link to="/fees" style={link}>Fees</Link></li>
                <li><Link to="/workers" style={link}>Workers</Link></li>
                <li><Link to="/attendance" style={link}>Attendance</Link></li>
                <li><Link to="/advanced-expenses" style={link}>Expenses</Link></li>
                <li><Link to="/history" style={link}>Payments</Link></li>
            </ul>
        </div>
    );
}

const link = {
    color: "white",
    textDecoration: "none",
    display: "block",
    margin: "10px 0"
};

export default Sidebar;