import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {
    const [data, setData] = useState(null);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard");
            setData(res.data);
        } catch (error) {
            alert("Unauthorized");
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!data) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Dashboard</h2>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {[
                    ["Total Students", data.totalStudents],
                    ["In Hostel", data.inHostel],
                    ["On Leave", data.onLeave],
                    ["Food Count", data.foodCount],
                    ["Pending Students", data.pendingStudents],
                    ["Total Pending ₹", data.totalPending],
                    ["Expenses ₹", data.totalExpenses]
                ].map(([title, value]) => (
                    <div key={title} style={{
                        background: "#f1f5f9",
                        padding: "20px",
                        borderRadius: "10px",
                        minWidth: "150px"
                    }}>
                        <h4>{title}</h4>
                        <h2>{value}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;