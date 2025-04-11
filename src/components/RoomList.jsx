import React from "react";
import { Container } from "react-bootstrap";
import RoomCard from "./RoomCard";

const RoomList = () => {
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      {Array.from({ length: 20 }).map((val, index) => (
        <RoomCard key={index} />
      ))}
    </Container>
  );
};

export default RoomList;
