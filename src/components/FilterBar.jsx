import { useState, useEffect, useRef, useContext } from "react";
import { ChevronDown } from "lucide-react";
import PriceFilter from "./PriceFilter";
import { RoomTypeContext } from "../context/RoomProvider";
import RoomTypeFilter from "./RoomTypeFilter";

const FilterBar = () => {
  const {
    filters,
    availableAmenities,
    availableServices,
    handlePriceChange,
    handleAmenityChange,
    handleServiceChange,
  } = useContext(RoomTypeContext);

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const amenitiesRef = useRef(null);

  // Calculate total active filters
  const totalActiveFilters = filters.amenities.length + filters.services.length;

  // Xử lý click bên ngoài để đóng dropdown tiện nghi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        amenitiesRef.current &&
        !amenitiesRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
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
      <RoomTypeFilter />

      {/* Bộ lọc giá - Sử dụng PriceFilter */}
      <div className="filter-item d-flex flex-column">
        <PriceFilter
          priceRange={filters.priceRange}
          setPriceRange={handlePriceChange}
        />
      </div>

      {/* Bộ lọc tiện nghi và dịch vụ */}
      <div className="filter-item position-relative" ref={amenitiesRef}>
        <button
          className={`rounded-pill d-flex align-items-center gap-2 px-3 py-2 ${
            totalActiveFilters > 0 ? "border-danger" : ""
          }`}
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          style={{
            border: `1px solid ${totalActiveFilters > 0 ? "#FF385C" : "#ddd"}`,
            backgroundColor: totalActiveFilters > 0 ? "#FFF5F7" : "white",
            color: totalActiveFilters > 0 ? "#FF385C" : "#222",
            transition: "all 0.3s ease",
          }}
          aria-label="Toggle amenities and services filter"
        >
          <span>Tiện nghi và dịch vụ</span>
          {totalActiveFilters > 0 && (
            <span className="badge bg-danger rounded-pill ms-1">{totalActiveFilters}</span>
          )}
          <ChevronDown size={16} style={{ color: "#FF385C" }} />
        </button>
        {showFilterDropdown && (
          <div
            className="position-absolute bg-white border rounded-3 mt-2 p-3 shadow-sm"
            style={{ zIndex: 1000, width: "280px", right: 0 }}
          >
            <div className="mb-3">
              <h5 className="border-bottom pb-2">Tiện nghi</h5>
              {availableAmenities.map((amenity) => (
                <div
                  key={amenity.amenityID}
                  className="d-flex align-items-center gap-2 py-1"
                >
                  <input
                    type="checkbox"
                    id={`amenity-${amenity.amenityID}`}
                    checked={filters.amenities.some(item => item.amenityID === amenity.amenityID)}
                    onChange={() => handleAmenityChange(amenity)}
                    style={{ accentColor: "#FF385C" }}
                    aria-label={`Select ${amenity.name} amenity`}
                  />
                  <label 
                    htmlFor={`amenity-${amenity.amenityID}`} 
                    className="d-flex align-items-center gap-2 mb-0 cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={amenity.pathImg} style={{ width: "18px" }} alt="" />
                    <span>{amenity.name}</span>
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h5 className="border-bottom pb-2">Dịch vụ</h5>
              {availableServices.map((service) => (
                <div
                  key={service.serviceID}
                  className="d-flex align-items-center gap-2 py-1"
                >
                  <input
                    type="checkbox"
                    id={`service-${service.serviceID}`}
                    checked={filters.services.some(item => item.serviceID === service.serviceID)}
                    onChange={() => handleServiceChange(service)}
                    style={{ accentColor: "#FF385C" }}
                    aria-label={`Select ${service.name} service`}
                  />
                  <label 
                    htmlFor={`service-${service.serviceID}`} 
                    className="d-flex align-items-center gap-2 mb-0"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={service.pathImg} style={{ width: "18px" }} alt="" />
                    <span>{service.name}</span>
                  </label>
                </div>
              ))}
            </div>
            {totalActiveFilters > 0 && (
              <div className="mt-3 text-end">
                <button 
                  className="btn btn-sm btn-link text-danger p-0" 
                  onClick={() => {
                    // Reset all filters
                    filters.amenities.forEach(amenity => handleAmenityChange(amenity));
                    filters.services.forEach(service => handleServiceChange(service));
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
