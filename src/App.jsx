// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomTypeProvider from "./hooks/RoomTypeProvider";
import NavigateProvider from "./hooks/NavigateProvider";
import HotelHot from "./pages/HotelHot";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <NavigateProvider>
      <RoomTypeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/hotelhot" element={<HotelHot />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RoomTypeProvider>
    </NavigateProvider>
  );
}

export default App;
