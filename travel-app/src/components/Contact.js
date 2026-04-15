import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            setResponseMsg(data.message);
            setShowModal(true);

            // reset form
            setForm({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            setResponseMsg("Something went wrong");
            setShowModal(true);
        }
    };

    return (
        <div className="contact">
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">Send</button>
            </form>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Message Status</h3>
                        <p>{responseMsg}</p>

                        <button onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;