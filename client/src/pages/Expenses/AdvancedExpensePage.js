import { useEffect, useState } from "react";
import API from "../../services/api";

function AdvancedExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const [workers, setWorkers] = useState([]);

    const [form, setForm] = useState({
        category: "Other",
        title: "",
        amount: "",
        paymentMode: "Cash",
        worker: "",
        items: [],
        materials: [],
        isPaid: true,
        note: ""
    });

    const [item, setItem] = useState({ name: "", quantity: "", price: "" });

    // 📥 Fetch data
    const fetchData = async () => {
        const exp = await API.get("/expenses");
        const work = await API.get("/workers");

        setExpenses(exp.data);
        setWorkers(work.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ➕ Add item (vegetables/materials)
    const addItem = () => {
        if (!item.name) return;

        const newItem = {
            ...item,
            quantity: Number(item.quantity),
            price: Number(item.price)
        };

        if (form.category === "Vegetables") {
            setForm({ ...form, items: [...form.items, newItem] });
        } else {
            setForm({ ...form, materials: [...form.materials, newItem] });
        }

        setItem({ name: "", quantity: "", price: "" });
    };

    // ➕ Add expense
    const addExpense = async () => {
        try {
            await API.post("/expenses", {
                ...form,
                amount: Number(form.amount)
            });

            alert("Expense added 💸");

            setForm({
                category: "Other",
                title: "",
                amount: "",
                paymentMode: "Cash",
                worker: "",
                items: [],
                materials: [],
                isPaid: true,
                note: ""
            });

            fetchData();

        } catch (error) {
            console.log(error.response?.data);
            alert("Error adding expense");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Advanced Expense System</h2>

            {/* CATEGORY */}
            <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
                <option>Worker</option>
                <option>Vegetables</option>
                <option>Maintenance</option>
                <option>Utilities</option>
                <option>Other</option>
            </select><br /><br />

            {/* COMMON */}
            <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            /><br /><br />

            <input
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
            /><br /><br />

            {/* WORKER PAYMENT */}
            {form.category === "Worker" && (
                <>
                    <select
                        value={form.worker}
                        onChange={(e) => setForm({ ...form, worker: e.target.value })}
                    >
                        <option value="">Select Worker</option>
                        {workers.map((w) => (
                            <option key={w._id} value={w._id}>
                                {w.name}
                            </option>
                        ))}
                    </select><br /><br />
                </>
            )}

            {/* ITEMS (Vegetables / Maintenance) */}
            {(form.category === "Vegetables" || form.category === "Maintenance") && (
                <>
                    <h4>Add Items</h4>

                    <input
                        placeholder="Name"
                        value={item.name}
                        onChange={(e) => setItem({ ...item, name: e.target.value })}
                    />

                    <input
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                    />

                    <input
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => setItem({ ...item, price: e.target.value })}
                    />

                    <button onClick={addItem}>Add Item</button>

                    <pre>{JSON.stringify(form.items || form.materials, null, 2)}</pre>
                </>
            )}

            {/* PAYMENT MODE */}
            <select
                value={form.paymentMode}
                onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
            >
                <option>Cash</option>
                <option>UPI</option>
                <option>Bank</option>
            </select><br /><br />

            {/* BILL STATUS */}
            <label>
                Paid:
                <input
                    type="checkbox"
                    checked={form.isPaid}
                    onChange={(e) => setForm({ ...form, isPaid: e.target.checked })}
                />
            </label><br /><br />

            <input
                placeholder="Note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
            /><br /><br />

            <button onClick={addExpense}>Add Expense</button>

            <hr />

            {/* LIST */}
            <h3>All Expenses</h3>

            {expenses.map((e) => (
                <div key={e._id} style={{ marginBottom: "10px" }}>
                    <b>{e.category}</b> | {e.title} | ₹{e.amount} |
                    {e.worker && ` Worker: ${e.worker.name}`} |
                    {e.isPaid ? "Paid" : "Pending"}
                </div>
            ))}
        </div>
    );
}

export default AdvancedExpensePage;