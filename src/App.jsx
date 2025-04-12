// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomTypeProvider from "./hooks/RoomTypeProvider";
import NavigateProvider from "./hooks/NavigateProvider";

function App() {
  return (
    <NavigateProvider>
      <RoomTypeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </RoomTypeProvider>
    </NavigateProvider>
  );
}

export default App;
