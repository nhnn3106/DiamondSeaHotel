import { useContext} from "react";
import RoomList from "../components/RoomList";
import { RoomTypeContext } from "../context/RoomProvider";
import FilterBar from "../components/FilterBar";
import { Navbar, Container } from "react-bootstrap";

const Home = () => {
  const { filteredRooms } = useContext(RoomTypeContext);

  return (
    <>
    <Navbar
        className="filter-bar border-bottom py-3 bg-white"
        style={{ zIndex: 1 }}
      >
        <Container className="d-flex">
          <FilterBar />
        </Container>
      </Navbar>
      <RoomList rooms={filteredRooms} />
    </>
  );
};

export default Home;

