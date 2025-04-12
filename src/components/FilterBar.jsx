import { useState, useEffect, useRef, useContext } from "react";
import { ChevronDown } from "lucide-react";
import PriceFilter from "./PriceFilter"; // Import PriceFilter
import { RoomTypeContext } from "../hooks/RoomTypeProvider";

const FilterBar = () => {
  const {
    filters,
    roomTypes,
    availableAmenities,
    handleRoomTypeChange,
    handlePriceChange,
    handleAmenityChange,
  } = useContext(RoomTypeContext);

  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const amenitiesRef = useRef(null);

  // Xử lý click bên ngoài để đóng dropdown tiện nghi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        amenitiesRef.current &&
        !amenitiesRef.current.contains(event.target)
      ) {
        setShowAmenitiesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-bar d-flex align-items-center gap-5 py-2 bg-white">
      {/* Bộ lọc loại phòng - Thanh trượt ngang với icon */}
      <div className="filter-item d-flex flex-column">
        <div
          className="room-types-slider d-flex gap-3"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {roomTypes.map((type) => (
            <button
              key={type.name}
              className={`room-type-btn rounded-pill d-flex align-items-center gap-2 px-3 py-2 ${
                filters.roomType === type.name ? "active" : ""
              }`}
              onClick={() => handleRoomTypeChange(type.name)}
              style={{
                border: `1px solid ${
                  filters.roomType === type.name ? "#FF385C" : "#ddd"
                }`,
                backgroundColor:
                  filters.roomType === type.name ? "#FFF5F7" : "white",
                color: filters.roomType === type.name ? "#FF385C" : "#222",
                transition: "all 0.3s ease",
              }}
            >
              {type.icon}
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bộ lọc giá - Sử dụng PriceFilter */}
      <div className="filter-item d-flex flex-column">
        <PriceFilter
          priceRange={filters.priceRange}
          setPriceRange={handlePriceChange}
        />
      </div>

      {/* Bộ lọc tiện nghi */}
      <div className="filter-item position-relative" ref={amenitiesRef}>
        <button
          className="rounded-pill d-flex align-items-center gap-2 px-3 py-2"
          onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
          style={{
            border: "1px solid #ddd",
            backgroundColor: "white",
            color: "#222",
            transition: "all 0.3s ease",
          }}
        >
          {filters.amenities.length > 0
            ? `${filters.amenities.length} tiện nghi đã chọn`
            : "Chọn tiện nghi"}
          <ChevronDown size={16} style={{ color: "#FF385C" }} />
        </button>
        {showAmenitiesDropdown && (
          <div
            className="position-absolute bg-white border rounded-3 mt-2 p-3 shadow-sm"
            style={{ zIndex: 1000, width: "220px" }}
          >
            {availableAmenities.map((amenity) => (
              <div
                key={amenity.name}
                className="d-flex align-items-center gap-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.name)}
                  onChange={() => handleAmenityChange(amenity.name)}
                  style={{ accentColor: "#FF385C" }}
                />
                {amenity.icon}
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
