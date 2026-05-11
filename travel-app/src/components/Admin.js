import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
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

    // Get token from session storage
    const token = sessionStorage.getItem("token");

    // Redirect if not logged in
    useEffect(() => {
        if (!token) {
            navigate("/admin-login");
        }
    }, [token, navigate]);

    // Fetch dashboard data
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                // BOOKINGS
                const bookingsRes = await fetch(
                    "https://island-escape.onrender.com/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (
                    bookingsRes.status === 401 ||
                    bookingsRes.status === 403
                ) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }

                const bookingsData = await bookingsRes.json();

                setBookings(bookingsData);
                setAllBookings(bookingsData);

                // MESSAGES
                const messagesRes = await fetch(
                    "https://island-escape.onrender.com/messages",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (
                    messagesRes.status === 401 ||
                    messagesRes.status === 403
                ) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }

                const messagesData = await messagesRes.json();

                setMessages(messagesData);
                setAllMessages(messagesData);

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

    }, [token, navigate]);

    // DELETE
    const confirmDelete = async () => {
        if (!token) return;

        try {
            if (type === "booking") {

                const res = await fetch(
                    `https://island-escape.onrender.com/bookings/${selectedId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (res.status === 401 || res.status === 403) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }

                const updated = allBookings.filter(
                    (b) => b._id !== selectedId
                );

                setAllBookings(updated);

                setBookings(
                    updated.filter((b) =>
                        b.name.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }

            if (type === "message") {

                const res = await fetch(
                    `https://island-escape.onrender.com/messages/${selectedId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (res.status === 401 || res.status === 403) {
                    sessionStorage.removeItem("token");
                    navigate("/admin-login");
                    return;
                }

                const updated = allMessages.filter(
                    (m) => m._id !== selectedId
                );

                setAllMessages(updated);

                setMessages(
                    updated.filter((m) =>
                        m.name.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }

            setShowModal(false);

        } catch (err) {
            console.error(err);
        }
    };

    // LOGOUT
    const logout = () => {
        sessionStorage.clear();
        navigate("/admin-login");
    };

    // SEARCH
    const handleSearch = (value) => {
        setSearch(value);

        const lower = value.toLowerCase();

        setBookings(
            allBookings.filter((b) =>
                b.name.toLowerCase().includes(lower)
            )
        );

        setMessages(
            allMessages.filter((m) =>
                m.name.toLowerCase().includes(lower)
            )
        );
    };

    return (
        <div className="admin-layout">

            {/* MOBILE HAMBURGER */}
            <div
                className="admin-hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            {/* SIDEBAR */}
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

                <h2>Admin</h2>

                <nav className="admin-nav">
                    <ul>
                        <li onClick={() => setMenuOpen(false)}>
                            Dashboard
                        </li>

                        <li onClick={() => setMenuOpen(false)}>
                            Bookings
                        </li>

                        <li onClick={() => setMenuOpen(false)}>
                            Messages
                        </li>
                    </ul>
                </nav>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>
            </aside>

            {/* MOBILE OVERLAY */}
            {menuOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* MAIN CONTENT */}
            <main className="admin-content">

                <h2>Dashboard</h2>

                <input
                    placeholder="Search bookings & messages..."
                    value={search}
                    onChange={(e) =>
                        handleSearch(e.target.value)
                    }
                />

                {/* BOOKINGS */}
                <h3>Bookings</h3>

                {bookings.map((b) => (
                    <div key={b._id} className="admin-card">

                        <div>
                            <p><strong>{b.name}</strong></p>
                            <p>{b.service}</p>
                            <p>{b.date}</p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedId(b._id);
                                setType("booking");
                                setShowModal(true);
                            }}
                        >
                            Delete
                        </button>

                    </div>
                ))}

                {/* MESSAGES */}
                <h3>Messages</h3>

                {messages.map((m) => (
                    <div key={m._id} className="admin-card">

                        <div>
                            <p><strong>{m.name}</strong></p>
                            <p>{m.email}</p>
                            <p>{m.message}</p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedId(m._id);
                                setType("message");
                                setShowModal(true);
                            }}
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </main>

            {/* STATS */}
            <div className="stats">
                <div>Total Bookings: {bookings.length}</div>
                <div>Total Messages: {messages.length}</div>
            </div>

            {/* DELETE MODAL */}
            {showModal && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h3>Confirm Delete</h3>

                        <p>
                            Are you sure you want to delete this {type}?
                        </p>

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