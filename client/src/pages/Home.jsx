// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import NotesView from "../components/NotesView";
const Home = () => {


  return (
    <div>
      <h1 className="font-lg font-bold mt-5 text-center">
        Welcome to the Home Page
      </h1>
      <div className="m-3">
        <h2 className="text-start font-semibold underline">note Posts</h2>
        <NotesView user_id={null}/>
      </div>
    </div>
  );
};

export default Home;
