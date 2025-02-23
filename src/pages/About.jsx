import React from 'react';
import "./About.css"; // Import CSS file

const About = () => {
  return (
<div>
      <img src="/image1.jpeg" className="img-fluid1" alt="About PakkaSwad" />
  
      <div className="about-container">
      <h2 className="about-title">PakkaSwad</h2>
      <div className="about-content">
        <p><span>✔</span> <strong>A Culinary Collection</strong> – Showcases a diverse range of recipes, cooking techniques, and flavors.</p>
        <p><span>✔</span> <strong>Step-by-Step Guidance</strong> – Provides clear instructions, ingredient lists, and expert tips.</p>
        <p><span>✔</span> <strong>For Every Cook</strong> – Ideal for both home cooks and professional chefs.</p>
        <p><span>✔</span> <strong>Cultural Essence</strong> – Reflects heritage, traditions, and creativity in every dish.</p>
        <p><span>✔</span> <strong>Fusion & Classics</strong> – Features both traditional favorites and modern, innovative recipes.</p>
        <p><span>✔</span> <strong>Inspiration & Exploration</strong> – Encourages experimenting with new flavors and cooking styles.</p>
        <p><span>✔</span> <strong>Your Kitchen Companion</strong> – An essential guide to elevate your culinary journey.</p>
      </div>
    </div>
    </div>
  );
}

export default About;
