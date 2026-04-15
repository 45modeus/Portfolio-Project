import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [type, setType] = useState("");

    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);

    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            navigate("/admin-login");
            return;
        }

        setTimeout(() => {
            sessionStorage.removeItem("isLoggedIn");
        }, 100);

    }, [navigate]);

    // Redirect if no token
    useEffect(() => {
        if (!token) {
            navigate("/admin-login");
        }
    }, [token, navigate]);

    // Fetch data securely
    useEffect(() => {
        if (!token) return;

        // BOOKINGS
        fetch("http://localhost:5000/bookings", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                setBookings(data);
                setAllBookings(data);
            });

        // MESSAGES
        fetch("http://localhost:5000/messages", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                setMessages(data);
                setAllMessages(data);
            });

    }, [token, navigate]);

    // DELETE logic
    const confirmDelete = async () => {
        if (!token) return;

        if (type === "booking") {
            const res = await fetch(`http://localhost:5000/bookings/${selectedId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                sessionStorage.removeItem("token");
                navigate("/admin-login");
                return;
            }

            const updated = allBookings.filter(b => b._id !== selectedId);
            setAllBookings(updated);

            setBookings(
                updated.filter(b =>
                    b.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        if (type === "message") {
            const res = await fetch(`http://localhost:5000/messages/${selectedId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                sessionStorage.removeItem("token");
                navigate("/admin-login");
                return;
            }

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
        sessionStorage.removeItem("token");
        navigate("/admin-login");
    };

    // Search
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

            {/* HAMBURGER (MUST BE INSIDE LAYOUT) */}
            <div
                className="admin-hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

                <h2>Admin</h2>

                <nav className="admin-nav">
                    <ul>
                        <li onClick={() => setMenuOpen(false)}>Dashboard</li>
                        <li onClick={() => setMenuOpen(false)}>Bookings</li>
                        <li onClick={() => setMenuOpen(false)}>Messages</li>
                    </ul>
                </nav>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </aside>

            {menuOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}

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