import { useState } from "react";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import About from "./About";
import Footer from "../components/Footer";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      <Header />
      <section style={{ marginTop: "220px" }}>
        <RoomList />
      </section>
      <Footer />
    </>
  );
};

export default Home;
