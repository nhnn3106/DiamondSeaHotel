import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "../components/ImageGallery";
import ListingInfo from "../components/ListingInfo";
import BookingCard from "../components/BookingCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {RoomTypeContext} from "../context/RoomProvider";
function HotelHot() {
  const { rooms } = useContext(RoomTypeContext);
  const topRooms = rooms.slice(0, 5); // Lấy 10 phòng đầu tiên
  console.log(topRooms);
  return (
    <>
      <Header />
      {topRooms.map((room) => (
        <div className="App" key={room.roomID}>
          <ImageGallery room={room} />
          <Container>
            <Row>
              <Col md={7} lg={8}>
                <ListingInfo room={room} />
              </Col>
              <Col md={5} lg={4}>
                <BookingCard room={room} />
              </Col>
            </Row>
          </Container>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default HotelHot;
