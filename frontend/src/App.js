import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { CreateRecipe } from "./pages/CreateRecipe";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import Food2 from "./pages/Food2";
import Food3 from "./pages/Food3";
import Food4 from "./pages/Food4";
import { Auth } from "./pages/Auth"; // Import the authentication page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food2" element={<Food2 />} />
        <Route path="/food3" element={<Food3 />} />
        <Route path="/food4" element={<Food4 />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
