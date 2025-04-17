import { Container, Alert } from "react-bootstrap";
import RoomCard from "./RoomCard";
import Lazyload from "react-lazyload";
import PropTypes from 'prop-types';

const RoomList = ({ rooms }) => {
  const newRoom = rooms.slice(0,12);
  
  if (rooms.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center">
        <Alert variant="info" className="p-5 shadow-sm">
          <h4 className="mb-3">Không tìm thấy phòng</h4>
          <p>Không có phòng nào phù hợp với bộ lọc hiện tại.<br />Vui lòng thử lại với các tiêu chí khác.</p>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      {newRoom.map((room) => (
        <Lazyload key={room.roomID} height={300} offset={100}>
          <RoomCard
            key={room.roomID}
            id={room.roomID}
            price={room.price}
            bedType={room.bedType}
            bedCount={room.bedCount}
            location={room.location}
            images={room.images}
          />
        </Lazyload>
      ))}
    </Container>
  );
};

// Add PropTypes validation
RoomList.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default RoomList;
