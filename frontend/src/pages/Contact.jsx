import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

        {/* Contact Info */}
        <div className="mb-6 space-y-3">
          <p className="flex items-center gap-2">
            <FaPhone className="text-blue-500" /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-red-500" /> contact@yourwebsite.com
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" /> 123, Street Name, City, India
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

