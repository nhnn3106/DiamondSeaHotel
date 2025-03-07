import React, { useEffect, useState } from "react";
import RoomCard from "../RoomCard";
import "./RoomDisplay.css";
const RoomDisplay = () => {
  const [roomtypes, setRoomTypes] = useState([]);

  return (
    <div className="room-display">
      <RoomCard />
    </div>
  );
};

export default RoomDisplay;
