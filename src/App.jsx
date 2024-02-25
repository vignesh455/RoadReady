import React from "react";
import Mainpg from "./Mainpg.js";
import Login from "./User.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Forgot from './Forgotpass.js';
import Register from "./Register.js";
import Profile from "./Profile.js";
import Reservation from "./Reservation.js";
import Payment from "./Payment.js";



function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Mainpg />} />
        <Route path="userlogin" element={<Login />} />
        <Route path="/forgot_password" element={<Forgot forgotpd={true}/>}/>
        <Route path="/register" element={<Register newuser={true}/>}/>
        <Route path="admin" element = {<Login isadmin={true}/>}/>
        <Route path="/Dashboard" element = {<Dashboard />}/>
        <Route path="/Profile" element = {<Profile/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
  );
}

export default App;