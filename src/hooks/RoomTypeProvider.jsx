import React, { createContext, useState } from "react";
import anyWhere from "../assets/location/any-where.png";
import austrialia from "../assets/location/austrialia.png";
import europe from "../assets/location/europe.png";
import korea from "../assets/location/korea.png";
import thailand from "../assets/location/thailand.png";
import usa from "../assets/location/usa.png";
import {
  Car,
  ChefHat,
  DoorClosed,
  Home,
  HomeIcon,
  Snowflake,
  Users,
  Waves,
  Wifi,
} from "lucide-react";

export const RoomTypeContext = createContext([]);

const RoomTypeProvider = ({ children }) => {
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

  console.log(searchData);

  const updateSearchData = (newData) => {
    setSearchData((prev) => ({ ...prev, ...newData }));
  };

  // Trạng thái bộ lọc
  const [filters, setFilters] = useState({
    roomType: "Any", // Loại phòng: Any, Entire home, Private room, Shared room
    priceRange: [50, 500], // Khoảng giá: [min, max]
    amenities: [], // Tiện nghi: danh sách các tiện nghi được chọn
  });

  const locations = [
    { name: "Tìm kiếm linh hoạt", img: anyWhere },
    { name: "Châu Úc", img: austrialia },
    { name: "Châu Âu", img: europe },
    { name: "Hàn Quốc", img: korea },
    { name: "Thái Lan", img: thailand },
    { name: "Hoa Kỳ", img: usa },
  ];

  // Danh sách các loại phòng với icon tương ứng
  const roomTypes = [
    { name: "Any", icon: <Home size={20} /> },
    { name: "Homestay", icon: <HomeIcon size={20} /> },
    { name: "Private room", icon: <DoorClosed size={20} /> },
    { name: "Shared room", icon: <Users size={20} /> },
  ];

  // Xử lý thay đổi loại phòng
  const handleRoomTypeChange = (roomType) => {
    setFilters((prev) => ({ ...prev, roomType }));
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (newPriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: newPriceRange }));
  };

  // Danh sách tiện nghi với icon
  const availableAmenities = [
    { name: "Wi-Fi", icon: <Wifi size={16} /> },
    { name: "Kitchen", icon: <ChefHat size={16} /> },
    { name: "Parking", icon: <Car size={16} /> },
    { name: "Air conditioning", icon: <Snowflake size={16} /> },
    { name: "Pool", icon: <Waves size={16} /> },
  ];

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((item) => item !== amenity)
      : [...filters.amenities, amenity];
    setFilters((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  return (
    <RoomTypeContext.Provider
      value={{
        searchData,
        updateSearchData,
        filters,
        setFilters,
        locations,
        roomTypes,
        availableAmenities,
        handleRoomTypeChange,
        handlePriceChange,
        handleAmenityChange,
      }}
    >
      {children}
    </RoomTypeContext.Provider>
  );
};

export default RoomTypeProvider;
