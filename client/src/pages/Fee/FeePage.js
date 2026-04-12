import { useEffect, useState } from "react";
import API from "../../services/api";

function Fee() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        API.get("/students").then(res => setStudents(res.data));
    }, []);

    const pay = async (id, amount) => {
        await API.post("/fees/pay", { studentId: id, amount });
        window.location.reload();
    };

    return (
        <div style={{ padding: "30px" }}>
            {students.map(s => (
                <div key={s._id} className="card">
                    <b>{s.name}</b> | Fee: {s.fee} | Paid: {s.paid} | Due: {s.fee - s.paid}
                    <br />
                    <input placeholder="Amount" id={s._id} />
                    <button onClick={() => {
                        const value = Number(document.getElementById(s._id).value);
                        if (!value || value <= 0) {
                            alert("Enter valid amount");
                            return;
                        }
                        pay(s._id, value);
                    }}>Pay</button>
                </div>
            ))}
        </div>
    );
}

export default Fee;