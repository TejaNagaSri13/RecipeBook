import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./CreateRecipe.css"; 



export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [time, setTime] = useState("");
 


  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cookies.access_token) {
      alert("You must be logged in to create a recipe!");
      navigate("/auth");
      return;
    }

    try {
      await axios.post(
        "https://recipebook1-20wl.onrender.com/create-recipe",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={recipe.name} onChange={handleChange} />
        <label>Description</label>
        <textarea name="description" value={recipe.description} onChange={handleChange}></textarea>
        <label>Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type="text" value={ingredient} onChange={(e) => {
            const newIngredients = [...recipe.ingredients];
            newIngredients[index] = e.target.value;
            setRecipe({ ...recipe, ingredients: newIngredients });
          }} />
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        <label htmlFor="time">Preparation Time (in minutes):</label>
        <input 
          type="number"   id="time"   value={time} onChange={(e) => setTime(e.target.value)} placeholder="Enter time in minutes" min="1"required />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};


