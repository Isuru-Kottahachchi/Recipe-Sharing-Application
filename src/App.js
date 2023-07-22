import React from 'react';
import './Components/style.css';
import Meal from './Components/Meal';
import Recipe from './Components/Recipe';
import { Route, Routes, Navigate, Link, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";

import Contactus from './Pages/contactus';
import Aboutus from './Pages/aboutus';

import Login from './Pages/login';

import NavigationBar from './Components/NavigationBar';
import NewRecipes from './Pages/NewRecipes'
import Add from './Pages/Add';
import Update from './Pages/Update';
import Editortest from './Pages/Editortest';



const App = () => {

  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);






  //Save user login in Database
  //User save in database

  const [userDetails, setUserDetails] = useState({

    user_name: "",
    user_id: "",
    registed_time: "",

  });

  if (user != null) { }
  else {

    const userDetails = axios.get(`http://localhost:5000/users/${user}`);

    if (userDetails == null) {

      setUserDetails({ registered_time: new Date() });
      setUserDetails({ user_name: user.fullName });
      setUserDetails({ user_id: user.id });

      axios.post("http://localhost:5000/users", userDetails);

    }
  }


  return (
    <>

      <NavigationBar user={user} />

      <Routes>
        <Route path="/" element={<Meal />} />
        <Route exact path="/:recipeId" element={<Recipe />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/login" element={user ? <Navigate to="/newrecipes" /> : <Login />} />


        <Route path="/newrecipes" element={user ? <NewRecipes user={user} /> : <Navigate to="/login" />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update user={user} />} />

        <Route path='/editortest' element={<Editortest />} />

      </Routes>



    </>
  )
}

export default App;