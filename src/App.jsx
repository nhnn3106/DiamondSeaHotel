
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomTypeProvider from "./hooks/RoomProvider";
import NavigateProvider from "./hooks/NavigateProvider";
import HotelHot from "./pages/HotelHot";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./hooks/AuthProvider";
import Profile from "./pages/Profile";
import RoomDetail from './components/RoomDetail';

function App() {
  return (
    <AuthProvider>
      <NavigateProvider>
        <RoomTypeProvider>
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
        </RoomTypeProvider>
      </NavigateProvider>
    </AuthProvider>
  );
}

export default App;

