import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Add = () => {
    const [recipe, setRecipe] = useState({

        recipe_name: "",
        recipe_country: "",
        recipe_category: "",
        recipe_ingredient: "",
        recipe_description: "",
        image: "",

        recipe_authorName: "",
        recipe_authorId: "",
        submitted_time: "",
    });
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        const date = new Date();
        setRecipe();
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/recipes", recipe);
            navigate("/newrecipes");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };


    /* Rich Text Editor */


    return (
        <div className="form">
            <h1>Add New Recipe</h1>
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
            <button onClick={handleClick}>Add Recipe</button>
            {error && "Something went wrong!"}
            <Link to="/newrecipes">See all new recipes</Link>

        </div>
    );
};

export default Add;