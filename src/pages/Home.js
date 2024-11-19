import React from "react";
import Login from "../components/Login";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>SPS REACT TEST</h1>

      <p>Author: Rodrigo Soliz</p>

      <Login />
    </div>
  );
}

export default Home;
