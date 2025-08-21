import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    // Choose endpoint: use /api/registrations (server already provides it).
    // If you prefer /api/contact, create that route on the server.
    const url = `${API_BASE}/api/registrations`;

    // Build payload — adapt fields if your server expects different names
    const payload = {
      name: formData.name,
      email: formData.email,
      // If you want to store the message field in server.raw, send it as `message`
      message: formData.message
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch (err) { json = { message: text }; }

      if (!res.ok) {
        console.error("Submit failed", res.status, json);
        setStatus("error");
        alert("Error: " + (json.error || json.message || `Server returned ${res.status}`));
      } else {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Network error", err);
      setStatus("error");
      alert("Network error: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} rows="5" required />
      <button type="submit" disabled={loading}>{loading ? "Sending…" : "Send"}</button>

      {status === "success" && <p style={{ color: "green" }}>Message sent successfully!</p>}
      {status === "error" && <p style={{ color: "red" }}>There was an error sending your message.</p>}
    </form>
  );
}

export default ContactForm;
