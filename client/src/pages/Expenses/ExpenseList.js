import { useEffect, useState } from "react";
import API from "../../services/api";

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({});

    const fetchExpenses = async () => {
        const res = await API.get("/expenses");
        setExpenses(res.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = async () => {
        await API.post("/expenses", form);
        fetchExpenses();
    };

    return (
        <div style={{ padding: "30px" }}>
            <div className="card">
                <h2>Add Expense</h2>

                <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
                <input placeholder="Amount" onChange={e => setForm({ ...form, amount: e.target.value })} />
                <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />

                <button onClick={addExpense}>Add</button>
            </div>

            {expenses.map(e => (
                <div key={e._id} className="card">
                    {e.title} | ₹{e.amount} | {e.category}
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;