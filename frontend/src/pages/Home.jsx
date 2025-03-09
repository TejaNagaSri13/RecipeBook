import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipebook1-20wl.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipebook1-20wl.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipebook1-20wl.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="title-img">
        <img src="/image1.jpeg" className="img-fluid1" alt="..." />
      </div>
       <h1>Welcome to Recipe Book !</h1>
        <p>Discover delicious recipes and save your favorites!</p>


      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p><span>✔</span> <strong>A Culinary Collection</strong> – Showcases a diverse range of recipes, cooking techniques, and flavors.</p>
        <p><span>✔</span> <strong>Step-by-Step Guidance</strong> – Provides clear instructions, ingredient lists, and expert tips.</p>
        <p><span>✔</span> <strong>For Every Cook</strong> – Ideal for both home cooks and professional chefs.</p>
        <p><span>✔</span> <strong>Cultural Essence</strong> – Reflects heritage, traditions, and creativity in every dish.</p>
        <p><span>✔</span> <strong>Fusion & Classics</strong> – Features both traditional favorites and modern, innovative recipes.</p>
        <p><span>✔</span> <strong>Inspiration & Exploration</strong> – Encourages experimenting with new flavors and cooking styles.</p>
        <p><span>✔</span> <strong>Your Kitchen Companion</strong> – An essential guide to elevate your culinary journey.</p>
      </section>

      {/* Recipes Section */}
      <section className="recipes-section">
        <h2>Recipes</h2>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <div className="home-nav-cat">
        <h2>Category</h2>
        <div className="flex-container">
          <div className="category-item" onClick={() => navigate('/food')}>
            <p>Salads</p>
          </div>
          <div className="category-item" onClick={() => navigate('/food2')}>
            <p>Snacks</p>
          </div>
          <div className="category-item" onClick={() => navigate('/food4')}>
            <p>Breakfast</p>
          </div>
          <div className="category-item" onClick={() => navigate('/food3')}>
            <p>Desserts</p>
          </div>
        </div>
      </div>


      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>📞 Phone: +91 9390188535</p>
        <p>📍 Location: Tanuku, India</p>
        <p>📧 Email: tejsri3@gmail.com</p>
      </section>
    </div>
  );
};

export default Home;
