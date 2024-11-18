import React from "react";
import Login from "../components/Login";

function Home() {
  return (
    <div>
      <h1>SPS REACT TEST</h1>

      <a href="/users">Usuários</a>
      <Login />
    </div>
  );
}

export default Home;
