import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useBooking } from "../context/BookingContext";
import PropTypes from 'prop-types';

function BookingCard({ hotel, room }) {
  const { validateBooking, updateBooking } = useBooking();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: "1",
    roomId: room?.roomID || hotel?.id || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    
    // Parse dữ liệu trước khi validate
    const dataToValidate = {
      ...formData,
      guests: parseInt(formData.guests),
      roomId: hotel?.id || null
    };
    
    if (validateBooking(dataToValidate)) {
      const nights = Math.ceil(
        (new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = parseFloat(room?.price || hotel?.booking?.price?.discounted) * nights + 10;
      
      // Cập nhật booking với dữ liệu đã parse
      updateBooking({
        ...dataToValidate,
        totalPrice
      });
      setShowSuccess(true);
    }
  };

  return (
    <Card className="booking-card shadow position-sticky" style={{ top: "2rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="fs-3 fw-bold">${room?.price || hotel?.booking?.price?.discounted}</span>
            <span className="text-muted">/đêm</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="text-warning me-1">★</span>
            <span>{room?.danhGia || hotel?.details?.rating}</span>
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
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
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
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="small fw-bold">KHÁCH</Form.Label>
            <Form.Select 
              className="rounded-3"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
            >
              <option value="1">1 khách</option>
              <option value="2">2 khách</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 py-3 mb-3 rounded-3"
            type="submit"
          >
            Đặt phòng ngay
          </Button>
        </Form>

        {showSuccess && (
          <div className="alert alert-success">
            Đặt phòng thành công!
          </div>
        )}

        <div className="border-top pt-3">
          <div className="d-flex justify-content-between mb-2">
            <span>${room?.price || hotel?.booking?.price?.discounted} x {formData.checkInDate && formData.checkOutDate ? 
              Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)) : 1} đêm</span>
            <span>${formData.checkInDate && formData.checkOutDate ? 
              parseFloat(room?.price || hotel?.booking?.price?.discounted) * Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)) : parseFloat(room?.price || hotel?.booking?.price?.discounted)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Phí dịch vụ</span>
            <span>$10</span>
          </div>
          <div className="d-flex justify-content-between fw-bold mt-3 pt-3 border-top">
            <span>Tổng tiền</span>
            <span>${formData.checkInDate && formData.checkOutDate ? 
              parseFloat(room?.price || hotel?.booking?.price?.discounted) * Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)) + 10 : parseFloat(room?.price || hotel?.booking?.price?.discounted) + 10}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

BookingCard.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number,
    booking: PropTypes.shape({
      price: PropTypes.shape({
        discounted: PropTypes.number,
        original: PropTypes.number,
        currency: PropTypes.string,
        unit: PropTypes.string
      })
    }),
    details: PropTypes.shape({
      rating: PropTypes.number
    })
  }),
  room: PropTypes.shape({
    roomID: PropTypes.number,
    price: PropTypes.string,
    danhGia: PropTypes.number
  })
};

export default BookingCard;
