import { useEffect, useState } from "react";
import API from "../../services/api";

function AttendancePage() {
    const [workers, setWorkers] = useState([]);
    const [history, setHistory] = useState([]);

    // 📥 Fetch workers
    const fetchWorkers = async () => {
        try {
            const res = await API.get("/workers");
            setWorkers(res.data);
        } catch (error) {
            alert("Error fetching workers");
        }
    };

    // 📥 Fetch attendance history
    const fetchHistory = async () => {
        try {
            const res = await API.get("/attendance/history");
            setHistory(res.data);
        } catch (error) {
            alert("Error fetching attendance");
        }
    };

    useEffect(() => {
        fetchWorkers();
        fetchHistory();
    }, []);

    // ✅ Mark attendance
    const markAttendance = async (workerId, status) => {
        try {
            await API.post("/attendance/mark", {
                workerId,
                status
            });

            alert("Attendance marked");

            fetchHistory();

        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Error marking attendance");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Worker Attendance</h2>

            {/* MARK ATTENDANCE */}
            <h3>Mark Attendance</h3>

            {workers.map((w) => (
                <div key={w._id} style={{ marginBottom: "10px" }}>
                    <b>{w.name}</b>

                    <button
                        onClick={() => markAttendance(w._id, "Present")}
                        style={{ marginLeft: "10px" }}
                    >
                        Present
                    </button>

                    <button
                        onClick={() => markAttendance(w._id, "Absent")}
                        style={{ marginLeft: "5px" }}
                    >
                        Absent
                    </button>
                </div>
            ))}

            <hr />

            {/* HISTORY */}
            <h3>Attendance History</h3>

            {history.length === 0 ? (
                <p>No records</p>
            ) : (
                history.map((h) => (
                    <div key={h._id}>
                        <b>{h.worker?.name}</b> |
                        Status: {h.status} |
                        Date: {new Date(h.createdAt).toLocaleDateString()}
                    </div>
                ))
            )}
        </div>
    );
}

export default AttendancePage;