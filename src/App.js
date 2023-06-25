import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Forgot from "./LoginComponents/Forgot";
import ForgotReq from "./LoginComponents/ForgotReq";
import Login from "./LoginComponents/Login";
import Register from "./LoginComponents/Register";
import RegisterReq from "./LoginComponents/RegisterReq";
import MovieAdmin from "./MovieAdmin";
import AddMovie from "./AddMovie";

function App() {
  return (
     
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route path="/ForgotReq" element={<ForgotReq />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/RegisterReq" element={<RegisterReq />} />
            <Route path="/MovieAdmin" element={<MovieAdmin />} />
            <Route path="/AddMovie" element={<AddMovie />} />
          </Routes>
          
  );
}

export default App;
