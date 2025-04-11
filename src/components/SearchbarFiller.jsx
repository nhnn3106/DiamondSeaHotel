import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import LocationDropdown from "./LocationDropdown";
import CheckDateDropdown from "./CheckDateDropdown";
import GuestDropdown from "./GuestDropdown";

const SearchbarFiller = ({
  searchData,
  updateSearchData,
  setShowSearchFiller,
  itemSelected, // Nhận itemSelected từ Header
  setItemSelected, // Nhận setItemSelected để cập nhật
}) => {
  // Đồng bộ itemSelected từ Header với state nội bộ
  const [localItemSelected, setLocalItemSelected] = useState(itemSelected);

  // Đồng bộ localItemSelected với itemSelected từ props
  useEffect(() => {
    setLocalItemSelected(itemSelected);
  }, [itemSelected]);

  const handleChangeItemSelected = (itemName) => {
    if (localItemSelected === itemName) {
      setLocalItemSelected("");
      setItemSelected(""); // Cập nhật lại itemSelected ở Header
    } else {
      setLocalItemSelected(itemName);
      setItemSelected(itemName); // Cập nhật lại itemSelected ở Header
    }
  };

  // Tự động select "check-in" sau khi chọn địa điểm
  const handleLocationSelect = (location) => {
    updateSearchData({ location });
    setLocalItemSelected("check-in");
    setItemSelected("check-in"); // Cập nhật itemSelected ở Header
  };

  return (
    <div className="search-filler d-flex align-items-center border rounded-pill position-relative">
      <div>
        <div
          className={`search-filler-item rounded-pill ${
            localItemSelected === "location"
              ? "bg-white search-filler-item-on-active"
              : ""
          }`}
          onClick={() => handleChangeItemSelected("location")}
        >
          <div className="fw-bold title">Địa điểm</div>
          <div className="text-secondary" style={{ width: "128px" }}>
            {searchData.location}
          </div>
        </div>
        {localItemSelected === "location" && (
          <LocationDropdown onSelect={handleLocationSelect} />
        )}
      </div>
      <div className="position-relative d-flex">
        <div
          className={`search-filler-item rounded-pill ${
            localItemSelected === "check-in"
              ? "bg-white search-filler-item-on-active"
              : ""
          }`}
          onClick={() => handleChangeItemSelected("check-in")}
        >
          <div className="fw-bold title">Nhận phòng</div>
          <div className="text-secondary" style={{ width: "100px" }}>
            {searchData.checkInDate
              ? searchData.checkInDate.toLocaleDateString()
              : "Thêm ngày"}
          </div>
        </div>
        <div>
          <div
            className={`search-filler-item rounded-pill ${
              localItemSelected === "check-out"
                ? "bg-white search-filler-item-on-active"
                : ""
            }`}
            onClick={() => handleChangeItemSelected("check-out")}
          >
            <div className="fw-bold title">Trả phòng</div>
            <div className="text-secondary" style={{ width: "100px" }}>
              {searchData.checkOutDate
                ? searchData.checkOutDate.toLocaleDateString()
                : "Thêm ngày"}
            </div>
          </div>
        </div>
        {(localItemSelected === "check-in" ||
          localItemSelected === "check-out") && (
          <CheckDateDropdown
            checkInDate={searchData.checkInDate}
            checkOutDate={searchData.checkOutDate}
            updateSearchData={updateSearchData}
          />
        )}
      </div>
      <div className="d-flex position-relative">
        <div
          className={`search-filler-item d-flex rounded-pill ${
            localItemSelected === "guest"
              ? "bg-white search-filler-item-on-active"
              : ""
          }`}
          onClick={() => handleChangeItemSelected("guest")}
        >
          <div>
            <div className="fw-bold title">Khách</div>
            <div className="text-secondary" style={{ width: "100px" }}>
              {searchData.guests.adults +
                searchData.guests.children +
                searchData.guests.infants >
              0
                ? `${
                    searchData.guests.adults +
                    searchData.guests.children +
                    searchData.guests.infants
                  } khách`
                : "Thêm khách"}
            </div>
          </div>
          <div className="search-btn search-btn-1 d-flex align-items-center text-white rounded-pill px-3 fw-bold">
            <div>Tìm kiếm</div>
            <Search size={18} className="ms-2" />
          </div>
        </div>
        {localItemSelected === "guest" && (
          <GuestDropdown
            guests={searchData.guests}
            updateSearchData={updateSearchData}
          />
        )}
      </div>
    </div>
  );
};

export default SearchbarFiller;
