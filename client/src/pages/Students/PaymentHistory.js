import { useEffect, useState } from "react";
import API from "../../services/api";

function PaymentHistory() {
    const [payments, setPayments] = useState([]);

    // 📥 Fetch payment history
    const fetchPayments = async () => {
        try {
            const res = await API.get("/fees/history");
            setPayments(res.data);
        } catch (error) {
            alert("Error fetching history");
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h2>Payment History</h2>

            {payments.length === 0 ? (
                <p>No payments yet</p>
            ) : (
                payments.map((p) => (
                    <div key={p._id} style={{ marginBottom: "10px" }}>
                        <b>{p.student?.name}</b> |
                        Amount: {p.amount} |
                        Mode: {p.paymentMode || "N/A"} |
                        Date: {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                ))
            )}
        </div>
    );
}

export default PaymentHistory;