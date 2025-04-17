import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingContext from "../context/BookingContext";
import { RoomTypeContext } from "../context/RoomProvider";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

import {
  FaBed,
  FaParking,
  FaWifi,
  FaCoffee,
  FaSnowflake,
  FaTv,
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { MdPeople, MdAttractions } from "react-icons/md";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Sửa lỗi icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const RoomDetail = () => {
  const { id } = useParams();
  const { isVerify } = useContext(AuthContext);
  const { bookingData, updateBooking, errors, validateBooking } = useContext(BookingContext);
  const navigate = useNavigate();
  const { currentRoom, handleClickRoom } = useContext(RoomTypeContext);

  // Load room data when component mounts or ID changes
  useEffect(() => {
    if (id) {
      handleClickRoom(parseInt(id));
    }
  }, [id, handleClickRoom]);

  if (!currentRoom) {
    return (
      <div className="room-detail-page bg-light">
        <Container className="py-5">
          <div className="text-center">
            <h4 className="text-danger">Không tìm thấy thông tin phòng</h4>
            <Button variant="primary" onClick={() => navigate("/")}>
              Quay lại trang chủ
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Dữ liệu địa điểm lân cận
  const nearbyPlaces = [
    {
      name: "Bãi biển Mũi Né",
      coordinates: [10.927, 108.1238],
      type: "Bãi biển",
      distance: "1.2km",
    },
    {
      name: "Suối Hồng (Fairy Stream)",
      coordinates: [10.928, 108.1258],
      type: "Địa điểm du lịch",
      distance: "2.5km",
    },
    {
      name: "Đồi Cát Bay",
      coordinates: [10.929, 108.1278],
      type: "Địa điểm du lịch",
      distance: "3.1km",
    },
    {
      name: "Làng Chài Mũi Né",
      coordinates: [10.926, 108.1228],
      type: "Văn hóa",
      distance: "0.8km",
    },
  ];

  // Hàm tính số đêm
  const calculateNights = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      return 1;
    }
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  // Hàm tính tổng tiền
  const calculateTotalPrice = () => {
    if (!currentRoom || !bookingData.checkInDate || !bookingData.checkOutDate) {
      return 0;
    }
    const nights = calculateNights();
    return parseFloat(currentRoom.price) * nights + 10;
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "guests" && parseInt(value) > currentRoom?.soNguoi) {
      alert(`Phòng này chỉ chứa tối đa ${currentRoom.soNguoi} khách.`);
      return;
    }
    updateBooking({ [name]: value });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    if (!isVerify) {
      alert("Vui lòng đăng nhập trên trang chủ");
      navigate("/login");
      return;
    }
    e.preventDefault();
    if (!currentRoom) return;

    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      alert("Vui lòng chọn ngày nhận phòng và trả phòng.");
      return;
    }

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);

    if (checkOut <= checkIn) {
      alert("Ngày trả phòng phải sau ngày nhận phòng.");
      return;
    }

    if (validateBooking(bookingData)) {
      const nights = calculateNights();
      const totalPrice = parseFloat(currentRoom.price) * nights + 10;

      updateBooking({ 
        totalPrice,
        roomID: currentRoom.roomID,
        roomName: currentRoom.name,
        roomPrice: currentRoom.price
      });
      navigate("/InputInfomation");
    }
  };

  // Style cho bản đồ
  const mapStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "8px",
    zIndex: 1,
  };

  return (
    <div className="room-detail-page bg-light">
      {/* Hero Section với ảnh phòng */}
      <div className="position-relative mb-5">
        <div className="gallery-container">
          <Row className="g-2">
            <Col md={6}>
              <img
                src={currentRoom.images[0]?.pathImg || "https://via.placeholder.com/800x400"}
                alt="Main"
                className="img-fluid main-image rounded shadow"
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={6}>
              <Row className="g-2">
                {currentRoom.images.slice(1).map((image, index) => (
                  <Col md={6} key={image.imageID}>
                    <img
                      src={image.pathImg}
                      alt={`Room ${index + 2}`}
                      className="img-fluid gallery-image rounded shadow"
                      style={{
                        height: "198px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <Container className="py-4">
        <Row>
          <Col lg={8}>
            {/* Tiêu đề và thông tin cơ bản */}
            <div className="mb-4">
              <h1 className="display-5 fw-bold mb-3">{currentRoom.name}</h1>
              <div className="d-flex align-items-center text-muted mb-3">
                <FaMapMarkerAlt className="me-2" />
                <span>{currentRoom.location}</span>
                <span className="mx-3">•</span>
                <span className="d-flex align-items-center">
                  <span className="text-warning me-1">★</span>
                  <span>{currentRoom.danhGia}</span>
                </span>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Thông tin phòng</h4>
                <Row className="g-4">
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <MdPeople className="text-primary fs-3 me-3" />
                      <div>
                        <div className="fw-bold">{currentRoom.soNguoi} Khách</div>
                        <small className="text-muted">Sức chứa tối đa</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <FaBed className="text-primary fs-3 me-3" />
                      <div>
                        <div className="fw-bold">
                          {currentRoom.bedCount} {currentRoom.bedType}
                        </div>
                        <small className="text-muted">Loại giường</small>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <IoBed className="text-primary fs-3 me-3" />
                      <div>
                        <div className="fw-bold">{currentRoom.dienTich}m²</div>
                        <small className="text-muted">Diện tích</small>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Tiện nghi */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Tiện nghi phòng</h4>
                <Row className="g-3">
                  {currentRoom.amenities.map((amenity, index) => (
                    <Col md={6} key={index}>
                      <div className="d-flex align-items-center p-2 border rounded">
                        {amenity === "Air Conditioning" && (
                          <FaSnowflake className="text-primary me-3 fs-4" />
                        )}
                        {amenity === "TV" && (
                          <FaTv className="text-primary me-3 fs-4" />
                        )}
                        <span>{amenity}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Dịch vụ */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Dịch vụ bao gồm</h4>
                <Row className="g-3">
                  {currentRoom.services.map((service, index) => (
                    <Col md={6} key={index}>
                      <div className="d-flex align-items-center p-2 border rounded">
                        {service === "Parking" && (
                          <FaParking className="text-primary me-3 fs-4" />
                        )}
                        {service === "Wi-Fi" && (
                          <FaWifi className="text-primary me-3 fs-4" />
                        )}
                        {service === "Breakfast" && (
                          <FaCoffee className="text-primary me-3 fs-4" />
                        )}
                        <span>{service}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Mô tả */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Mô tả</h4>
                <p className="text-muted lh-lg">{currentRoom.moTa}</p>
              </Card.Body>
            </Card>

            {/* Vị trí */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Vị trí</h4>

                {/* Thông tin địa chỉ */}
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt className="text-primary me-2 fs-4" />
                    <div>
                      <h6 className="mb-1 fw-bold">{currentRoom.location}</h6>
                      <p className="mb-0 text-muted">
                        Khu vực trung tâm, dễ dàng di chuyển
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center gap-2"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${currentRoom.location}`, '_blank')}
                  >
                    <FaDirections /> Xem chỉ đường
                  </Button>
                </div>

                {/* Bản đồ */}
                <div className="map-container rounded overflow-hidden mb-4">
                  <MapContainer
                    center={[10.927, 108.1238]} // Tọa độ mặc định của Mũi Né
                    zoom={15}
                    style={mapStyle}
                    scrollWheelZoom={false}
                    zoomControl={true}
                    doubleClickZoom={true}
                    dragging={true}
                  >
                    <TileLayer
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Marker khách sạn */}
                    <Marker
                      position={[10.927, 108.1238]}
                    >
                      <Popup>
                        <div
                          className="text-center"
                          style={{ minWidth: "200px" }}
                        >
                          <img
                            src={currentRoom.images[0]?.pathImg}
                            alt={currentRoom.name}
                            className="img-fluid mb-2 rounded"
                            style={{
                              width: "150px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <h6 className="mb-1">{currentRoom.name}</h6>
                          <p className="mb-1 small text-muted">
                            {currentRoom.location}
                          </p>
                          <p className="mb-0 text-primary fw-bold">
                            ${currentRoom.price}/đêm
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                    {/* Markers địa điểm lân cận */}
                    {nearbyPlaces.map((place, index) => (
                      <Marker key={index} position={place.coordinates}>
                        <Popup>
                          <div className="text-center">
                            <h6 className="mb-1">{place.name}</h6>
                            <Badge bg="info" className="mb-2">
                              {place.type}
                            </Badge>
                            <p className="mb-0 small text-muted">
                              Cách {place.distance}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Danh sách địa điểm lân cận */}
                <div>
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <MdAttractions className="text-primary" />
                    Địa điểm lân cận
                  </h5>
                  <Row className="g-3">
                    {nearbyPlaces.map((place, index) => (
                      <Col md={6} key={index}>
                        <div className="d-flex align-items-center p-2 border rounded">
                          <div>
                            <h6 className="mb-1">{place.name}</h6>
                            <div className="d-flex align-items-center gap-2">
                              <Badge bg="info">{place.type}</Badge>
                              <small className="text-muted">
                                Cách {place.distance}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Card */}
          <Col lg={4}>
            <Card
              className="booking-card shadow position-sticky"
              style={{ top: "2rem" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <span className="fs-3 fw-bold">${currentRoom.price}</span>
                    <span className="text-muted">/đêm</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-warning me-1">★</span>
                    <span>{currentRoom.danhGia}</span>
                  </div>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-2 mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label className="small fw-bold">
                          NHẬN PHÒNG
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className="rounded-3"
                          name="checkInDate"
                          value={bookingData.checkInDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.checkInDate && (
                          <Form.Text className="text-danger">
                            {errors.checkInDate}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label className="small fw-bold">
                          TRẢ PHÒNG
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className="rounded-3"
                          name="checkOutDate"
                          value={bookingData.checkOutDate}
                          onChange={handleInputChange}
                          min={
                            bookingData.checkInDate ||
                            new Date().toISOString().split("T")[0]
                          }
                        />
                        {errors.checkOutDate && (
                          <Form.Text className="text-danger">
                            {errors.checkOutDate}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold">KHÁCH</Form.Label>
                    <Form.Select
                      className="rounded-3"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                    >
                      {[...Array(currentRoom.soNguoi)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} khách
                        </option>
                      ))}
                    </Form.Select>
                    {errors.guests && (
                      <Form.Text className="text-danger">
                        {errors.guests}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 py-3 mb-3 rounded-3"
                    type="submit"
                  >
                    Đặt phòng ngay
                  </Button>
                </Form>

                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      ${currentRoom.price} x {calculateNights()} đêm
                    </span>
                    <span>
                      ${(parseFloat(currentRoom.price) * calculateNights()).toFixed(2)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Phí dịch vụ</span>
                    <span>$10</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-3 pt-3 border-top">
                    <span>Tổng tiền</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RoomDetail;