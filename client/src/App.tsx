import { useState } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Listposts from "./Components/Listposts";

function App() {
  return (
    <>
      <h1>BLOGGING APP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Listposts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
