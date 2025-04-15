import React from "react";
import { Container } from "react-bootstrap";
import RoomCard from "./RoomCard";

const RoomList = ({ rooms }) => {
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      {rooms.map((room) => (
        <RoomCard
          key={room.roomID}
          id={room.roomID}
          price={room.price}
          bedType={room.bedType}
          bedCount={room.bedCount}
          location={room.location}
          images={room.images}
        />
      ))}
    </Container>
  );
};

export default RoomList;
