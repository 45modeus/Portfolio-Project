import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

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

            alert("Server says: " + data.message);

            // reset form
            setForm({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="contact">
            <h2>Contact Us / Contactez-nous / Kontak nou</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name / Nom / Non" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Contact;