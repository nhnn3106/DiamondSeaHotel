import { Container, Alert, Row, Col } from "react-bootstrap";
import RoomCard from "./RoomCard";
import Lazyload from "react-lazyload";
import PropTypes from "prop-types";

const RoomList = ({ rooms }) => {
  const newRoom = rooms.slice(0, 20);

  if (rooms.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center">
        <Alert variant="info" className="p-5 shadow-sm">
          <h4 className="mb-3">Không tìm thấy phòng</h4>
          <p>
            Không có phòng nào phù hợp với bộ lọc hiện tại.
            <br />
            Vui lòng thử lại với các tiêu chí khác.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="g-4 justify-content-center">
        {newRoom.map((room) => (
          <Col key={room.roomID} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <Lazyload height={380} offset={100} once>
              <RoomCard
                id={room.roomID}
                price={room.price}
                bedType={room.bedType}
                bedCount={room.bedCount}
                location={room.location}
                images={room.images}
              />
            </Lazyload>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Add PropTypes validation
RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default RoomList;
