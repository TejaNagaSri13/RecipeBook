import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Contact from './pages/Contact';
import Food from './pages/Food';
import Food2 from './pages/Food2';
import Food3 from './pages/Food3';
import Food4 from './pages/Food4';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        <Route path="/about" element={<About />}/>
        <Route path="/recipes" element={<Recipes/>} />
        <Route path="/food" element={<Food />} />
        <Route path="/food2" element={<Food2 />} />
        <Route path="/food3" element={<Food3 />} />
        <Route path="/food4" element={<Food4 />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/contact" element={ <Contact /> } />
      </Routes>
    </Router>
  );
}

export default App;