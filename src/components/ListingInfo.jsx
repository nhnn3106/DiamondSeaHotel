import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { StarFill, HouseDoor, Key } from "react-bootstrap-icons"; 


function ListingInfo({ hotel }) {
  const Icon = hotel.amenities.propertyType.icon;
  return (
    <div>
      <h3>{hotel.details.type}</h3>
      <p className="text-muted">
        {hotel.details.bedType}: {hotel.details.bathroom}
      </p>
      <div className="d-flex align-items-center mb-3">
        <StarFill className="text-warning me-1" />
        <span className="fw-bold me-1">{hotel.details.rating}</span>
        <span className="text-decoration-underline">
          {hotel.details.reviewCount}
        </span>
      </div>
      <hr />
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <Image src={hotel.host.avatar} roundedCircle width={50} height={50} />
        </Col>
        <Col>
          <div className="fw-bold">Lựa chọn chỗ ở của {hotel.host.name}</div>
          <div className="text-muted">
            {hotel.amenities.propertyType.description}
          </div>
        </Col>
      </Row>

      <hr />
      <div className="my-4">
        <div className="d-flex align-items-start mb-3">
          <Icon size={24} className="me-3 mt-1 text-secondary" />
          <div>
            <div className="fw-bold"> {hotel.amenities.propertyType.title}</div>
            <div>{hotel.amenities.propertyType.description}</div>
          </div>
        </div>
        <div className="d-flex align-items-start mb-3">
          <Key size={24} className="me-3 mt-1 text-secondary" />
          <div>
            <div className="fw-bold">Tự nhận phòng</div>
            <div>Tự nhận phòng với hộp khóa an toàn.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingInfo;
