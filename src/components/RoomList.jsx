import React from "react";
import { Container } from "react-bootstrap";
import RoomCard from "./RoomCard";

const RoomList = () => {
  // Mock data - trong thực tế sẽ lấy từ API
  const rooms = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    // Các thông tin khác của phòng có thể thêm vào đây
  }));

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      {rooms.map((room) => (
        <RoomCard key={room.id} roomId={room.id} />
      ))}
    </Container>
  );
};

export default RoomList;
