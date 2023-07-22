import React from "react";
import { useState, useEffect } from "react";

import MealItem from "./MealItem";
import ReacipeIndex from "./RecipeIndex";

import './style.css';

const Meal = () => {
    const [search, setSearch] = useState();
    const [show, setShow] = useState(false);
    const [item, setItem] = useState("");
    const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/search.php?f=a");

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setItem(data.meals);
            setShow(true);
        })
    }, [url])

    const searchRecipe = (evt) => {
        setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    }
    const setIndex = (alpha) => {
        setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
    }
    return (
        <>

            <div className="main">

                <div className="heading">
                    <h1>Happy Chef!</h1>
                    <h4>We have more than 1000+ recipes. Search your favorite</h4>
                </div>
                <div className="searchBox">
                    <input type="search" placeholder="Type your food name" className="search-bar" onChange={e => setSearch(e.target.value)} onKeyPress={searchRecipe} />
                </div>

                {/*Recipe images*/}
                <div className="container">
                    {
                        show ? <MealItem data={item} /> : "Not Found"

                    }
                </div>

                {/*Recipe alphabet order*/}
                <div className="indexContainer">
                    <ReacipeIndex alphaIndex={(alpha) => setIndex(alpha)} />
                </div>

            </div>
        </>
    )
}
export default Meal;