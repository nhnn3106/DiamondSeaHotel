import { useState } from "react";
import Header from "../components/Header";
import RoomList from "../components/RoomList";
import Footer from "../components/Footer";

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
        <RoomList />
      </section>
      <Footer />
    </>
  );
};

export default Home;
