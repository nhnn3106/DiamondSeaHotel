import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import {
  TelephoneFill,
  EnvelopeFill,
  GeoAltFill,
  ClockFill,
  SendFill,
} from "react-bootstrap-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "/images/marker-icon.png",
      iconRetinaUrl: "/images/marker-icon-2x.png",
      shadowUrl: "/images/marker-shadow.png",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Gửi tin nhắn thành công");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="Contact-aurora-wrapper d-flex flex-column align-items-center p-3 p-md-4 pt-5">
        <Container
          style={{ maxWidth: "1140px", zIndex: 1 }}
          className="mt-4 mt-md-5"
        >
          <div className="text-center mb-5 pb-3">
            <h1 className="display-3 fw-bold Contact-main-heading mb-3">
              Kết Nối Với Chúng Tôi
            </h1>
            <p
              className="mt-3 fs-5 Contact-text-light-secondary mx-auto"
              style={{ maxWidth: "750px" }}
            >
              Để lại lời nhắn hoặc thông tin liên hệ, chúng tôi sẽ phản hồi bạn
              trong thời gian sớm nhất!
            </p>
          </div>

          <Row className="g-4 g-lg-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Card className="Contact-card-glass">
                <Card.Body className="p-4 p-lg-5">
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingName"
                          label="Họ và tên"
                          className="Contact-floating-label"
                        >
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="Contact-form-control"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingEmail"
                          label="Email"
                          className="Contact-floating-label"
                        >
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="Contact-form-control"
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <FloatingLabel
                      controlId="floatingSubject"
                      label="Tiêu đề"
                      className="mb-3 Contact-floating-label"
                    >
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Tiêu đề"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="Contact-form-control"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingMessage"
                      label="Nội dung lời nhắn"
                      className="mb-4 Contact-floating-label"
                    >
                      <Form.Control
                        as="textarea"
                        name="message"
                        placeholder="Nội dung lời nhắn"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="Contact-form-control"
                        style={{ height: "140px" }}
                      />
                    </FloatingLabel>
                    <Button
                      variant={null}
                      type="submit"
                      disabled={isLoading}
                      className="w-100 Contact-button-pink"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Đang gửi...
                        </>
                      ) : (
                        <span className="d-inline-flex align-items-center justify-content-center gap-2">
                          <SendFill /> Gửi Tin Nhắn Ngay
                        </span>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <div className="d-flex flex-column gap-4">
                <Card className="Contact-card-glass">
                  <Card.Body className="p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4 Contact-info-item">
                      <div className="Contact-info-icon-wrapper me-3">
                        {" "}
                        <TelephoneFill className="fs-5" />{" "}
                      </div>
                      <div>
                        <h3 className="Contact-info-heading">Điện thoại</h3>
                        <p className="Contact-info-text">+84 123 456 789</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 Contact-info-item">
                      <div className="Contact-info-icon-wrapper me-3">
                        {" "}
                        <EnvelopeFill className="fs-5" />{" "}
                      </div>
                      <div>
                        <h3 className="Contact-info-heading">Email</h3>
                        <p className="Contact-info-text">
                          info@amazingfood.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 Contact-info-item">
                      <div className="Contact-info-icon-wrapper me-3">
                        {" "}
                        <GeoAltFill className="fs-5" />{" "}
                      </div>
                      <div>
                        <h3 className="Contact-info-heading">Địa chỉ</h3>
                        <p className="Contact-info-text">
                          123 Nguyễn Huệ, Quận 1, TP.HCM
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center Contact-info-item">
                      <div className="Contact-info-icon-wrapper me-3">
                        {" "}
                        <ClockFill className="fs-5" />{" "}
                      </div>
                      <div>
                        <h3 className="Contact-info-heading">Giờ mở cửa</h3>
                        <p className="Contact-info-text">T2-CN: 8:00 - 22:00</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <div className="Contact-map-container">
                  <MapContainer
                    center={new LatLng(10.762622, 106.660172)}
                    zoom={15}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={new LatLng(10.762622, 106.660172)}>
                      <Popup>
                        Amazing Food <br /> 123 Nguyễn Huệ, Q.1
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ height: "50px" }}></div>
      </div>
    </>
  );
}

export default Contact;
