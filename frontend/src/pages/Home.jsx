import React from 'react';
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <div class="title-img">
        <img src="/image1.jpeg" class="img-fluid1" alt="..." />
     </div>

      <div class="home-about">
      <h2>About Us</h2>
      <p><span>✔</span> <strong>A Culinary Collection</strong> – Showcases a diverse range of recipes, cooking techniques, and flavors.</p>
      <p><span>✔</span> <strong>Step-by-Step Guidance</strong> – Provides clear instructions, ingredient lists, and expert tips.</p>
      <p><span>✔</span> <strong>For Every Cook</strong> – Ideal for both home cooks and professional chefs.</p>
      <p><span>✔</span> <strong>Cultural Essence</strong> – Reflects heritage, traditions, and creativity in every dish.</p>
      <p><span>✔</span> <strong>Fusion & Classics</strong> – Features both traditional favorites and modern, innovative recipes.</p>
      <p><span>✔</span> <strong>Inspiration & Exploration</strong> – Encourages experimenting with new flavors and cooking styles.</p>
      <p><span>✔</span> <strong>Your Kitchen Companion</strong> – An essential guide to elevate your culinary journey.</p>
      </div>

      <div class="home-nav-cat">
        <h2>Category</h2>
      <div className="flex items-center justify-center h-screen">
      <div 
        className="border p-6 rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
        onClick={() => navigate('/food')}>
        <p className="text-xl font-semibold">Salads</p>
      </div>
    </div>
    <div className="flex items-center justify-center h-screen">
      <div 
        className="border p-6 rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
        onClick={() => navigate('/food2')}>
        <p className="text-xl font-semibold">Snacks</p>
      </div>
    </div>
    <div className="flex items-center justify-center h-screen">
      <div 
        className="border p-6 rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
        onClick={() => navigate('/food4')}>
        <p className="text-xl font-semibold">Breakfast</p>
      </div>
    </div>
    <div className="flex items-center justify-center h-screen">
      <div 
        className="border p-6 rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
        onClick={() => navigate('/food3')}>
        <p className="text-xl font-semibold">Desserts</p>
      </div>
    </div>
    </div>
    
        
      <div class="contact-det">
      <h3>contact info</h3>
            <a href="#">+91 9390188535</a>
            <a href="#">Tanuku,India</a>
            <a href="#">tejsri3@gmail.com</a>
      </div>

    </div>
  )
}

export default Home