import { useEffect, useState } from "react";
import API from "../../services/api";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: "", phone: "", fee: "", paid: "", joiningDate: ""
    });

    const fetchStudents = async () => {
        const res = await API.get("/students");
        setStudents(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const addStudent = async () => {
        try {
            await API.post("/students", form);
            fetchStudents();
        } catch {
            alert("Error adding student");
        }
    };

    const deleteStudent = async (id) => {
        await API.delete(`/students/${id}`);
        fetchStudents();
    };

    return (
        <div style={{ padding: "30px" }}>
            <div className="card">
                <h2>Add Student</h2>

                <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
                <input placeholder="Fee" onChange={e => setForm({ ...form, fee: e.target.value })} />
                <input placeholder="Paid" onChange={e => setForm({ ...form, paid: e.target.value })} />
                <input type="date" onChange={e => setForm({ ...form, joiningDate: e.target.value })} />

                <button onClick={addStudent}>Add Student</button>
            </div>

            <div>
                {students.map(s => (
                    <div key={s._id} className="card">
                        <b>{s.name}</b> | {s.phone} <br />
                        Fee: ₹{s.fee} | Paid: ₹{s.paid} | Due: ₹{s.fee - s.paid}
                        <br />
                        <button onClick={() => deleteStudent(s._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentList;