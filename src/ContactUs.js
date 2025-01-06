import React, { useState } from "react";
import { Link } from "react-router-dom";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send formData to a backend API here
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const AppBar = () => (
    <nav className="app-bar">
      <div className="app-bar-logo">
        <Link to="/" className="logo-link">Biogas Dashboard</Link>
      </div>
      <ul className="app-bar-links">
        <li><Link to="/Main">Home</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
        <li><Link to="/educational-tools">Educational Tools</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );

  return (
    <div className="contact-us-page">
      <AppBar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? Reach out to us!</p>
        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">Send Message</button>
          </form>
        ) : (
          <div className="thank-you">
            <h2>Thank you!</h2>
            <p>Your message has been sent. We'll get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
