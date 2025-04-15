import { useContext, useState } from "react";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import About from "./About";
import Footer from "../components/Footer";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import { RoomTypeContext } from "../hooks/RoomProvider";

const Home = () => {
  const { rooms } = useContext(RoomTypeContext);
  // console.log(rooms);
  return (
    <>
      <RoomList rooms={rooms} />
    </>
  );
};

export default Home;
