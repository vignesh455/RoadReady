import React from "react";
import Mainpg from "./Mainpg.js";
import Login from "./User.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Forgot from "./Forgotpass.js";
import Register from "./Register.js";
import Profile from "./Profile.js";
import Reservation from "./Reservation.js";
import Payment from "./Payment.js";
import Admin from "./Admin.js";
import AdminRegister from "./AdminRegister.js";
import AdminDash from "./AdminDashboard.js";
import AdminProfile from "./AdminProfile.js";
import UserBookings from "./UserBookings.js";
import AddCar from "./AdminAddCar.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpg />} />
      <Route path="userlogin" element={<Login />} />
      <Route path="/forgot_password" element={<Forgot forgotpd={true} />} />
      <Route path="/register" element={<Register newuser={true} />} />
      <Route path="/adminregister" element={<AdminRegister newuser={true} />} />
      <Route path="admin" element={<Admin />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/AdminDashboard" element={<AdminDash />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/AdminProfile" element={<AdminProfile />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/userbookings" element={<UserBookings />} />
      <Route path="/addcar" element={<AddCar />} />
    </Routes>
  );
}

export default App;
