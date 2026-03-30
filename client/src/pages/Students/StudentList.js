import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [fee, setFee] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [washing, setWashing] = useState(false);

    const [gName, setGName] = useState("");
    const [gPhone, setGPhone] = useState("");
    const [gAddress, setGAddress] = useState("");

    // FETCH STUDENTS
    const fetchStudents = async () => {
        const res = await axios.get("http://localhost:5000/api/students/all");
        setStudents(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ADD STUDENT
    const addStudent = async () => {
        if (!name || !phone) {
            alert("Name and Phone are required");
            return;
        }

        await axios.post("http://localhost:5000/api/students/add", {
            name,
            phone,
            fee: Number(fee),
            feeDueDate: dueDate,
            washingMachine: washing,
            guardian: {
                name: gName,
                phone: gPhone,
                address: gAddress,
            },
        });

        // CLEAR FORM
        setName("");
        setPhone("");
        setFee("");
        setDueDate("");
        setWashing(false);
        setGName("");
        setGPhone("");
        setGAddress("");

        fetchStudents();
    };

    // DELETE
    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
    };

    // PAY FEE
    const payFee = async (id) => {
        await axios.post(`http://localhost:5000/api/students/pay/${id}`, {
            amount: 1000,
        });
        fetchStudents();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Management</h2>

            {/* FORM */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="Fee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                />

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={washing}
                        onChange={(e) => setWashing(e.target.checked)}
                    />
                    Washing Machine
                </label>

                <input
                    placeholder="Guardian Name"
                    value={gName}
                    onChange={(e) => setGName(e.target.value)}
                />

                <input
                    placeholder="Guardian Phone"
                    value={gPhone}
                    onChange={(e) => setGPhone(e.target.value)}
                />

                <input
                    placeholder="Guardian Address"
                    value={gAddress}
                    onChange={(e) => setGAddress(e.target.value)}
                />

                <button onClick={addStudent}>Add</button>
            </div>

            {/* TABLE */}
            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Fee</th>
                        <th>Due Date</th>
                        <th>Washing</th>
                        <th>Guardian</th>
                        <th>Guardian Phone</th>
                        <th>Delete</th>
                        <th>Pay</th>
                        <th>Paid</th>
                        <th>Remaining</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s) => {
                        const paid = s.paid || 0;
                        const feeValue = s.fee || 0;
                        const remaining = feeValue - paid;

                        return (
                            <tr key={s._id}>
                                <td>{s._id}</td>
                                <td>{s.name}</td>
                                <td>{s.phone}</td>
                                <td>{feeValue}</td>

                                <td>
                                    {s.feeDueDate
                                        ? new Date(s.feeDueDate).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td>{s.washingMachine ? "Yes" : "No"}</td>
                                <td>{s.guardian?.name}</td>
                                <td>{s.guardian?.phone}</td>

                                <td>
                                    <button onClick={() => deleteStudent(s._id)}>
                                        Delete
                                    </button>
                                </td>

                                <td>
                                    <button onClick={() => payFee(s._id)}>
                                        Pay ₹1000
                                    </button>
                                </td>

                                <td>{paid}</td>
                                <td>{remaining}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;