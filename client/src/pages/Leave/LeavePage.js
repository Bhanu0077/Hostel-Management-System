import { useEffect, useState } from "react";
import API from "../../services/api";

function Leave() {
    const [students, setStudents] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        API.get("/students").then(res => setStudents(res.data));
        API.get("/leaves/active").then(res => setLeaves(res.data));
    }, []);

    const applyLeave = async () => {
        await API.post("/leaves", form);
        window.location.reload();
    };

    return (
        <div style={{ padding: "30px" }}>
            <div className="card">
                <h2>Apply Leave</h2>

                <select onChange={e => setForm({ ...form, studentId: e.target.value })}>
                    <option>Select Student</option>
                    {students.map(s => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                </select>

                <input type="date" onChange={e => setForm({ ...form, fromDate: e.target.value })} />
                <input type="date" onChange={e => setForm({ ...form, toDate: e.target.value })} />
                <input placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} />

                <button onClick={applyLeave}>Apply Leave</button>
            </div>

            <div>
                {leaves.map(l => (
                    <div key={l._id} className="card">
                        {l.student?.name} | {new Date(l.fromDate).toLocaleDateString()} → {new Date(l.toDate).toLocaleDateString()}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leave;