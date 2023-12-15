import { useState } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <h1>BLOGGING APP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
