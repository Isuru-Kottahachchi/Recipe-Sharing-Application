
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



//Fetch data using backend server
export const NewRecipes = (user) => {

    const [recipes, setRecipes] = useState([]);

    //Calling the backend API from the frontend using the Axios Library
    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await axios.get("http://localhost:5000/recipes/?order=desc");
                setRecipes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllRecipes();
    }, []);


    console.log(recipes);

    //Calling the backend API to perform a delete operation.
    const handleDelete = async (id) => {



        const confirmed = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmed) {
            // Perform delete operation

            //Checking the recipe_authorID with logged in user Id
            const recipeDetails = await axios.get(`http://localhost:5000/recipes/${id}`);
            const recipeAuthorId = recipeDetails.recipe_authorId;

            if (recipeAuthorId === user.id) {

                try {
                    await axios.delete(`http://localhost:5000/recipes/${id}`);
                    window.location.reload()
                } catch (err) {
                    console.log(err);
                }

            }
            else {
                alert("You cannot delete this recipe");
            }

        }

    };

    //Hnadle the search 
    const [inputValue, setInputValue] = useState('');
    const handleSearch = async (e) => {


        try {
            console.log(e.target.value);
            setInputValue(e.target.value);

            // Handle the response data (e.g., update state or display results)
        } catch (error) {
            // Handle the error
        }
    };


    return (
        <div>
            <button className="addHome">
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new Recipe
                </Link>
            </button>
            <input type="text" placeholder='Serach your Recipe' className='search' value={inputValue} onChange={handleSearch} />
            <div className="recipes">


                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe">
                        <img src={recipe.cover} className="recipeimage" alt="" />
                        <h1>{recipe.recipe_name}</h1>
                        <h2>Country : {recipe.recipe_country}</h2>
                        <p>{recipe.recipe_description}</p>

                        <button className="delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
                        <button className="update">
                            <Link
                                to={`/update/${recipe.id}`}
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default NewRecipes;

