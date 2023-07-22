import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

const Update = ({user}) => {
  const [recipe, setRecipe] = useState({
    recipe_name: "",
    recipe_country: "",
    recipe_category: "",
    recipe_ingredient: "",
    recipe_description: "",
    image: "",
  });
  const [error, setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  
  console.log(location.pathname);
  
  const recipeId = location.pathname.split("/")[2];

  console.log(recipeId);

  const handleChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/recipes/${recipeId}`, recipe);
      navigate("/newrecipes");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Recipe</h1>
      <input
        type="text"
        placeholder="Recipe title"
        name="recipe_name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Recipe Country"
        name="recipe_country"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Recipe Category"
        name="recipe_category"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Recipe Ingredients"
        name="recipe_ingredient"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Recipe Description"
        name="recipe_description"
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Image"
        name="image"
        onChange={handleChange}
      />
      <button onClick={handleClick} >Update</button>
      {error && "Something went wrong!"}
      <Link to="/newrecipes">See all Recipes</Link>
    </div>
  );
};

export default Update;