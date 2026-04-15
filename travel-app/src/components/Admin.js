import { useEffect, useState } from "react";
import "../styles/Admin.css";

function Admin() {
    const token = localStorage.getItem("token");

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [type, setType] = useState("");

    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);

    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    const [search, setSearch] = useState("");

    // Fetch data
    useEffect(() => {
        fetch("http://localhost:5000/bookings", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setAllBookings(data);
            });

        fetch("http://localhost:5000/messages", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setAllMessages(data);
            });
    }, [token]);

    // DELETE logic
    const confirmDelete = async () => {
        if (type === "booking") {
            await fetch(`http://localhost:5000/bookings/${selectedId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const updated = allBookings.filter(b => b._id !== selectedId);
            setAllBookings(updated);

            setBookings(
                updated.filter(b =>
                    b.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        if (type === "message") {
            await fetch(`http://localhost:5000/messages/${selectedId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const updated = allMessages.filter(m => m._id !== selectedId);
            setAllMessages(updated);

            setMessages(
                updated.filter(m =>
                    m.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        setShowModal(false);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin-login";
    };

    // SEARCH (GLOBAL FIX)
    const handleSearch = (value) => {
        setSearch(value);

        const lower = value.toLowerCase();

        setBookings(
            allBookings.filter(b =>
                b.name.toLowerCase().includes(lower)
            )
        );

        setMessages(
            allMessages.filter(m =>
                m.name.toLowerCase().includes(lower)
            )
        );
    };

    return (
        <div className="admin-layout">

            <aside className="sidebar">
                <h2>Admin</h2>
                <p>Dashboard</p>
                <p>Bookings</p>
                <p>Messages</p>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </aside>

            <main className="admin-content">

                <h2>Dashboard</h2>

                <input
                    placeholder="Search bookings & messages..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <h3>Bookings</h3>
                {bookings.map((b) => (
                    <div key={b._id} className="admin-card">
                        <p>{b.name} - {b.service}</p>
                        <button onClick={() => {
                            setSelectedId(b._id);
                            setType("booking");
                            setShowModal(true);
                        }}>
                            Delete
                        </button>
                    </div>
                ))}

                <h3>Messages</h3>
                {messages.map((m) => (
                    <div key={m._id} className="admin-card">
                        <div>
                            <p><strong>{m.name}</strong></p>
                            <p>{m.email}</p>
                            <p>{m.message}</p>
                        </div>
                        <button onClick={() => {
                            setSelectedId(m._id);
                            setType("message");
                            setShowModal(true);
                        }}>
                            Delete
                        </button>
                    </div>
                ))}

            </main>

            <div className="stats">
                <div>Total Bookings: {bookings.length}</div>
                <div>Total Messages: {messages.length}</div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this {type}?</p>

                        <div className="modal-actions">
                            <button
                                onClick={() => setShowModal(false)}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="delete-btn"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;