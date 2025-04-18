import { createContext, useEffect, useState } from "react";
import anyWhere from "../assets/location/any-where.png";
import austrialia from "../assets/location/austrialia.png";
import europe from "../assets/location/europe.png";
import korea from "../assets/location/korea.png";
import thailand from "../assets/location/thailand.png";
import usa from "../assets/location/usa.png";
import axios from "axios";
import PropTypes from 'prop-types';

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

  const updateSearchData = (newData) => {
    setSearchData((prev) => ({ ...prev, ...newData }));
  };

  // Trạng thái bộ lọc
  const [filters, setFilters] = useState({
    roomType: "Any",
    priceRange: [100000, 1000000],
    amenities: [],
    services: [], // Thêm services vào filters
  });

  const [locations, setLocations] = useState([
    { name: "Tìm kiếm linh hoạt", img: anyWhere },
    { name: "Austrialia", img: austrialia },
    { name: "France", img: europe },
    { name: "South Korea", img: korea },
    { name: "Thailand", img: thailand },
    { name: "United States", img: usa },
  ]);

  
  const [currentRoom, setCurrentRoom] = useState(null);


  //Danh sách phòng
  const [rooms, setRooms] = useState([]);
  // Danh sách các loại phòng với icon tương ứng
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Danh sách tiện nghi với icon
  const [availableAmenities, setAvailableAmenities] = useState([]);

  // Danh sách dịch vụ với icon
  const [availableServices, setAvailableServices] = useState([]);

  // Fetch room types từ API
  useEffect(() => {
    const fetchRoomTypes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/roomtypes");
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
        setError("Không thể tải danh sách loại phòng. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchAmenities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/amenities");
        setAvailableAmenities(response.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
        setError("Không thể tải danh sách loại phòng. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/services");
        setAvailableServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Không thể tải danh sách dịch vụ. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRooms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await axios.get("http://localhost:3000/rooms").then((response) => {
          setRooms(response.data);
        });
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Không thể tải danh sách phòng. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/locations");
        // Map API locations to our format with images
        const locationImages = {
          "Tìm kiếm linh hoạt": anyWhere,
          "United States": usa,
          "Australia": austrialia,
          "France": europe,
          "South Korea": korea,
          "Thailand": thailand
        };
        
        // Create a new array with "Tìm kiếm điểm đến" at the beginning
        const formattedLocations = [
          { name: "Tìm kiếm điểm đến", img: anyWhere }
        ];
        
        // Add remaining locations from API
        response.data.forEach(loc => {
          const countryName = loc.country;
          formattedLocations.push({
            name: countryName,
            img: locationImages[countryName] || anyWhere
          });
        });
        
        setLocations(formattedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Không thể tải danh sách địa điểm. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomTypes();
    fetchAmenities();
    fetchServices();
    fetchRooms();
    fetchLocations();
  
  }, []);

  // Xử lý thay đổi loại phòng
  const handleRoomTypeChange = (roomType) => {
    setFilters((prev) => ({ ...prev, roomType }));
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (newPriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: newPriceRange }));
  };

  // Xử lý thay đổi tiện nghi
  const handleAmenityChange = (amenity) => {
    setFilters((prev) => {
      const updatedAmenities = prev.amenities.some(item => item.amenityID === amenity.amenityID)
        ? prev.amenities.filter((item) => item.amenityID !== amenity.amenityID)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updatedAmenities };
    });
  };

  // Xử lý thay đổi dịch vụ
  const handleServiceChange = (service) => {
    setFilters((prev) => {
      const updatedServices = prev.services.some(item => item.serviceID === service.serviceID)
        ? prev.services.filter((item) => item.serviceID !== service.serviceID)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };

  // Filtered rooms based on all filters
  const filteredRooms = rooms.filter((room) => {
    // Match location - check if location contains the search location or if searching for any location
    const matchesLocation = 
      searchData.location === "Tìm kiếm điểm đến" ||
      searchData.location === "Tìm kiếm linh hoạt" ||
      (room.location && room.location.includes(searchData.location));

    // Match guest count
    const totalGuests =
      searchData.guests.adults +
      searchData.guests.children +
      searchData.guests.infants;
    const matchesGuests = totalGuests === 0 || totalGuests <= room.soNguoi;

    // Match room type
    const matchesRoomType =
      filters.roomType === "Any" || room.roomTypeName === filters.roomType;
    
    // Match price range - convert string to number and compare
    const roomPrice = parseFloat(room.price);
    const matchesPrice =
      !isNaN(roomPrice) && 
      filters.priceRange[0] <= roomPrice &&
      roomPrice <= filters.priceRange[1];

    // Check if room has all selected amenities
    const matchesAmenities = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => {
        // Check if amenities exist in the room's amenities array
        return Array.isArray(room.amenities) && room.amenities.includes(amenity.name);
      });

    // Check if room has all selected services
    const matchesServices = filters.services.length === 0 ||
      filters.services.every(service => {
        // Check if services exist in the room's services array
        return Array.isArray(room.services) && room.services.includes(service.name);
      });

    // Return true only if all filters match
    return (
      matchesLocation && 
      matchesGuests && 
      matchesRoomType && 
      matchesPrice &&
      matchesAmenities &&
      matchesServices
    );
  });


  // setCurentRoom(filteredRooms[0]);
  const handleClickRoom = (roomID) => {
    const selectedRoom = rooms.find(room => room.roomID === roomID);
    setCurrentRoom(selectedRoom);
  }
  


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
        availableServices,
        handleRoomTypeChange,
        handlePriceChange,
        handleAmenityChange,
        handleServiceChange,
        rooms,
        isLoading,
        error,
        handleClickRoom,
        currentRoom,
        filteredRooms
      }}
    >
      {children}
    </RoomTypeContext.Provider>
  );
};

// Add PropTypes validation
RoomTypeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default RoomTypeProvider;
