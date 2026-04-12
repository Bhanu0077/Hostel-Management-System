import { useEffect, useState } from "react";
import API from "../../services/api";

function WorkerList() {
    const [workers, setWorkers] = useState([]);
    const [form, setForm] = useState({});

    const fetchWorkers = async () => {
        const res = await API.get("/workers");
        setWorkers(res.data);
    };

    useEffect(() => {
        fetchWorkers();
    }, []);

    const addWorker = async () => {
        await API.post("/workers", form);
        fetchWorkers();
    };

    const deleteWorker = async (id) => {
        await API.delete(`/workers/${id}`);
        fetchWorkers();
    };

    return (
        <div style={{ padding: "30px" }}>
            <div className="card">
                <h2>Add Worker</h2>

                <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
                <input placeholder="Role" onChange={e => setForm({ ...form, role: e.target.value })} />
                <input placeholder="Salary" onChange={e => setForm({ ...form, salary: e.target.value })} />

                <button onClick={addWorker}>Add Worker</button>
            </div>

            {workers.map(w => (
                <div key={w._id} className="card">
                    {w.name} | {w.role} | ₹{w.salary}
                    <br />
                    <button onClick={() => deleteWorker(w._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default WorkerList;