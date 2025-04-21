import { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RoomTypeContext } from "../context/RoomProvider";

const LocationDropdown = ({ onSelect }) => {
  const { locations, updateSearchData, filteredRooms } = useContext(RoomTypeContext);
  
  // Create a state to track available countries from the rooms data
  const [availableCountries, setAvailableCountries] = useState([]);
  
  // Get unique countries from both locations array and room locations
  useEffect(() => {
    const uniqueCountries = [];
    
    // Add the default "Tìm kiếm điểm đến" option
    uniqueCountries.push({
      name: "Tìm kiếm điểm đến",
      img: locations[0]?.img || "/assets/location/any-where.png",
      count: filteredRooms.length
    });
    
    // Process locations from the API
    locations.forEach(location => {
      if (location.name !== "Tìm kiếm linh hoạt" && location.name !== "Tìm kiếm điểm đến") {
        const countryName = location.name;
        // Count rooms in this country
        const roomsInCountry = filteredRooms.filter(room => 
          room.location.includes(countryName)
        ).length;
        
        if (roomsInCountry > 0) {
          uniqueCountries.push({
            name: countryName,
            img: location.img,
            count: roomsInCountry
          });
        }
      }
    });
    
    setAvailableCountries(uniqueCountries);
  }, [locations, filteredRooms]);

  const handleLocationClick = (locationName) => {
    updateSearchData({ location: locationName });
    onSelect(locationName);
  };

  return (
    <div
      className="bg-white border p-3 position-absolute shadow-sm location-dropdown-container"
      style={{
        top: "80px",
        width: "750px", // Increased fixed width to prevent shrinking
        left: "50%", 
        transform: "translateX(-50%)", // Center the dropdown
        borderRadius: "16px",
        zIndex: 1001, // Ensures it's above FilterBar
        overflow: "visible", // Allow content to overflow
        maxHeight: "500px", // Limit maximum height
        overflowY: "auto" // Add scrolling if needed
      }}
    >
      <div className="fw-bold mb-3 ms-2 border-bottom pb-2">Tìm kiếm theo khu vực</div>
      <Container fluid>
        <Row className="g-3">
          {availableCountries.map((location, index) => (
            <Col
              xs={6} md={4}
              key={index}
              className={`location-option p-2 rounded-4 d-flex flex-column justify-content-center align-items-center ${
                location.count === 0 ? 'opacity-50' : ''
              }`}
              onClick={() => location.count > 0 && handleLocationClick(location.name)}
              style={{ cursor: location.count > 0 ? 'pointer' : 'default' }}
            >
              <div className="position-relative">
                <img
                  src={location.img}
                  className="rounded-4"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: location.count === 0 ? 'grayscale(100%)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  alt={location.name}
                />
                {location.count > 0 && (
                  <span className="position-absolute top-0 end-0 badge bg-danger rounded-pill mt-2 me-2">
                    {location.count}
                  </span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="fw-medium">{location.name}</div>
                <small className="text-muted">{location.count} phòng</small>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LocationDropdown;
