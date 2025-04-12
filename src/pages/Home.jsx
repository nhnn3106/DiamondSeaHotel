import { useState } from "react";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import About from "./About";
import Footer from "../components/Footer";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";

const Home = () => {
  const [searchData, setSearchData] = useState({
    location: "Tìm kiếm điểm đến",
    checkInDate: null,
    checkOutDate: null,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
    },
  });

  const updateSearchData = (newData) => {
    setSearchData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <>
      <Header searchData={searchData} updateSearchData={updateSearchData} />
      <section style={{ marginTop: "220px" }}>
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
};

export default Home;
