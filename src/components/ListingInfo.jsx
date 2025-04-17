import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { StarFill, HouseDoor, Key } from "react-bootstrap-icons"; 

function ListingInfo({ room }) {
  return (
    <div>
      <h3>{room.roomTypeName}</h3>
      <p className="text-muted">
        {room.bedType} - {room.bedCount} giường
      </p>
      <div className="d-flex align-items-center mb-3">
        <StarFill className="text-warning me-1" />
        <span className="fw-bold me-1">{room.danhGia}</span>
      </div>
      <hr />
      <div className="my-4">
        <div className="d-flex align-items-start mb-3">
          <HouseDoor size={24} className="me-3 mt-1 text-secondary" />
          <div>
            <div className="fw-bold">Thông tin phòng</div>
            <div>Diện tích: {room.dienTich}m²</div>
            <div>Số người: {room.soNguoi} người</div>
            <div>Địa điểm: {room.location}</div>
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
      <hr />
      <div className="my-4">
        <h5>Tiện ích</h5>
        <div className="d-flex flex-wrap gap-2">
          {room.amenities.map((amenity, index) => (
            <span key={index} className="badge bg-light text-dark">
              {amenity}
            </span>
          ))}
        </div>
      </div>
      <div className="my-4">
        <h5>Dịch vụ</h5>
        <div className="d-flex flex-wrap gap-2">
          {room.services.map((service, index) => (
            <span key={index} className="badge bg-light text-dark">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListingInfo;
