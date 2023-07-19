import React from "react";
import { Routes, Route } from "react-router-dom";
import Venues from "./Venues";
import Events from "./Events";
import Cart from "./Cart";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Venues />}></Route>
      <Route path="/events" element={<Events />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Main;
