import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        pendingFees: 0,
    });

    const fetchStats = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/students/stats"
        );
        setStats(res.data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard 🚀</h1>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div style={card}>
                    <h3>Total Students</h3>
                    <p>{stats.totalStudents}</p>
                </div>

                <div style={card}>
                    <h3>Pending Fees</h3>
                    <p>{stats.pendingFees}</p>
                </div>
            </div>
        </div>
    );
}

const card = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
};

export default Dashboard;