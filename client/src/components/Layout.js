import { Link } from "react-router-dom";

function Layout({ children }) {
    return (
        <div style={{ display: "flex" }}>

            {/* Sidebar */}
            <div style={{
                width: "200px",
                background: "#1e293b",
                color: "white",
                height: "100vh",
                padding: "20px"
            }}>
                <h2>HMS</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link to="/dashboard" style={link}>Dashboard</Link>
                    <Link to="/students" style={link}>Students</Link>
                    <Link to="/leave" style={link}>Leave</Link>
                    <Link to="/fees" style={link}>Fees</Link>
                    <Link to="/workers" style={link}>Workers</Link>
                    <Link to="/attendance" style={link}>Attendance</Link>
                    <Link to="/expenses" style={link}>Expenses</Link>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                {children}
            </div>

        </div>
    );
}

const link = {
    color: "white",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "5px"
};

export default Layout;