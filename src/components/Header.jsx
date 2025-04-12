import React, { useEffect, useState, useCallback, useRef } from "react";
import Logo from "./Logo";
import { Container, Navbar } from "react-bootstrap";
import SearchBar from "./Searchbar";
import { Globe } from "lucide-react";
import UserActions from "./UserActions";
import SearchbarFiller from "./SearchbarFiller";
import FilterBar from "./FilterBar"; // Import FilterBar component
import { Link } from "react-router-dom";

const Header = ({ searchData, updateSearchData }) => {
  const [showSearchFiller, setShowSearchFiller] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const lastScrollY = useRef(0);
  const rafId = useRef(null);
  const isScrolling = useRef(false);
  const headerRef = useRef(null);

  // Trạng thái bộ lọc
  const [filters, setFilters] = useState({
    roomType: "Any", // Loại phòng: Any, Entire home, Private room, Shared room
    priceRange: [50, 500], // Khoảng giá: [min, max]
    amenities: [], // Tiện nghi: danh sách các tiện nghi được chọn
  });

  // Xử lý click bên ngoài để đóng SearchFiller
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowSearchFiller(false);
        setItemSelected("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="position-fixed bg-white start-0 end-0"
      style={{ top: 0, zIndex: 1000 }}
      ref={headerRef}
    >
      <Navbar className={`py-5 ${!showSearchFiller ? "border-bottom" : ""}`}>
        <Container className="ms-5">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
        </Container>
        <Container
          className="position-relative"
          style={{ marginLeft: "-50px" }}
        >
          {!showSearchFiller && (
            <SearchBar
              showSearchFiller={showSearchFiller}
              setShowSearchFiller={setShowSearchFiller}
              setItemSelected={setItemSelected}
              searchData={searchData}
            />
          )}
        </Container>
        <Container className="me-5" style={{ width: "900px" }}>
          <Link
            to="/about"
            className="btn-item p-2 fw-semibold text-black text-decoration-none"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="btn-item p-2 fw-semibold text-black text-decoration-none"
          >
            Contact
          </Link>

          <div
            className="btn-item p-2 fw-semibold"
            style={{ fontSize: "13px", width: "max-content" }}
          >
            Cho thuê chỗ ở qua Airbnb
          </div>
          <div className="btn-item p-2 d-flex justify-content-center align-items-center">
            <Globe size={19} />
          </div>
          <UserActions />
        </Container>
      </Navbar>
      <Navbar
        className={`search-bar-filler position-relative ${
          showSearchFiller ? "fade-in d-block border-bottom" : "fade-out d-none"
        }`}
        style={{ zIndex: 2 }}
      >
        <Container className="d-flex justify-content-center">
          <SearchbarFiller
            searchData={searchData}
            updateSearchData={updateSearchData}
            setShowSearchFiller={setShowSearchFiller}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </Container>
      </Navbar>
      <Navbar
        className="filter-bar border-bottom py-3 bg-white"
        style={{ zIndex: 1 }}
      >
        <Container className="d-flex justify-content-center">
          <FilterBar filters={filters} setFilters={setFilters} />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
