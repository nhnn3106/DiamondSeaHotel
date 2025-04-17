// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomTypeProvider from "./context/RoomProvider";
import NavigateProvider from "./context/NavigateProvider";
import HotelHot from "./pages/HotelHot";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthProvider";
import Profile from "./pages/Profile";
import RoomDetail from "./components/RoomDetail";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <AuthProvider>
      <NavigateProvider>
        <RoomTypeProvider>
          <BookingProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/hotelhot" element={<HotelHot />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/room/:id" element={<RoomDetail />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </BookingProvider>
        </RoomTypeProvider>
      </NavigateProvider>
    </AuthProvider>
  );
}

export default App;
