import React from "react";
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { Gem } from "react-bootstrap-icons"; 

function BookingCard({ hotel }) {
  console.log(hotel);
  return (
    <Card className="shadow-sm" style={{ top: "20px" }}>
      <Card.Body>
        <div className="mb-3 d-flex align-items-center">
          <Gem size={20} className="text-danger me-2" />
          <div>
            <div className="fw-bold">{hotel.level}</div>
            <div className="text-muted small">Chỗ ở này thường kín phòng</div>
          </div>
        </div>
        <div className="mb-3">
          <span className="text-muted text-decoration-line-through me-2">
            {hotel.booking.price.original}
            {hotel.booking.price.currency}
          </span>
          <span className="fw-bold fs-5">
            {hotel.booking.price.discounted}
            {hotel.booking.price.currency}
          </span>
          <span className="text-muted"> / {hotel.booking.price.unit}</span>
        </div>
        <Form>
          <Row className="g-0 border rounded mb-3">
            <Col xs={6} className="border-end">
              <Form.Group controlId="checkinDate" className="p-2">
                <Form.Label className="small text-uppercase fw-bold">
                  Nhận phòng
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel.booking.defaults.checkin}
                  defaultValue={hotel.booking.defaults.checkin}
                  className="border-0 px-0"
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="checkoutDate" className="p-2">
                <Form.Label className="small text-uppercase fw-bold">
                  Trả phòng
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={hotel.booking.defaults.checkout}
                  defaultValue={hotel.booking.defaults.checkout}
                  className="border-0 px-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="guests" className="mb-3">
            <Form.Label className="small text-uppercase fw-bold">
              Khách
            </Form.Label>
            <Form.Select defaultValue={hotel.booking.defaults.guests}>
              {Array.from({ length: hotel.booking.maxGuests }).map(
                (_, index) => (
                  <option value={index} key={index}>{index + 1} khách</option>
                )
              )}
            </Form.Select>
          </Form.Group>

          <Button
            variant="danger"
            type="submit"
            className="w-100 fw-bold"
            size="lg"
          >
            Đặt phòng
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default BookingCard;
