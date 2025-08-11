import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(null); // "success" | "error"

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        required
      />

      <button type="submit">Send</button>

      {status === "success" && (
        <p style={{ color: "green" }}>Message sent successfully!</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>There was an error sending your message.</p>
      )}
    </form>
  );
}

export default ContactForm;
