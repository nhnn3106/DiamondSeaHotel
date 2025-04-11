import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import anyWhere from "../assets/location/any-where.png";
import austrialia from "../assets/location/austrialia.png";
import europe from "../assets/location/europe.png";
import korea from "../assets/location/korea.png";
import thailand from "../assets/location/thailand.png";
import usa from "../assets/location/usa.png";

const LocationDropdown = ({ onSelect }) => {
  const locations = [
    { name: "Tìm kiếm linh hoạt", img: anyWhere },
    { name: "Châu Úc", img: austrialia },
    { name: "Châu Âu", img: europe },
    { name: "Hàn Quốc", img: korea },
    { name: "Thái Lan", img: thailand },
    { name: "Hoa Kỳ", img: usa },
  ];

  const handleLocationClick = (locationName) => {
    onSelect(locationName);
  };

  return (
    <div
      className="bg-white border p-3 position-absolute end-0"
      style={{
        top: "80px",
        width: "max-content",
        left: "-12%",
        borderRadius: "16px",
        zIndex: 1001, // Thêm z-index để nằm trên FilterBar
      }}
    >
      <div className="fw-bold ms-2">Tìm kiếm theo khu vực</div>
      <Container fluid>
        <Row>
          {locations.slice(0, 3).map((location, index) => (
            <Col
              key={index}
              className="location-option p-2 rounded-4 d-flex flex-column justify-content-center align-items-center"
              onClick={() => handleLocationClick(location.name)}
            >
              <img
                src={location.img}
                className="rounded-4"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt={location.name}
              />
              <div className="mt-2">{location.name}</div>
            </Col>
          ))}
        </Row>
        <Row>
          {locations.slice(3).map((location, index) => (
            <Col
              key={index}
              className="location-option p-2 rounded-4 d-flex flex-column justify-content-center align-items-center"
              onClick={() => handleLocationClick(location.name)}
            >
              <img
                src={location.img}
                className="rounded-4"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt={location.name}
              />
              <div className="mt-2">{location.name}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LocationDropdown;
