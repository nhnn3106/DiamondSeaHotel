import { useState, useContext, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import BookingContext from "../context/BookingContext";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { RoomTypeContext } from "../context/RoomProvider";
import { AuthContext } from "../context/AuthProvider";
import { formatCurrency } from "../utils/formatters";


function BookingCard({ room }) {
  const navigate = useNavigate();
  const { validateBooking, updateBooking,errors } = useContext(BookingContext);
  const {isVerify} = useContext(AuthContext);
  const { handleClickRoom } = useContext(RoomTypeContext);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: "1",
    roomId: room?.roomID || null
  });
  const [modalShow, setModalShow] = useState(false);



  useEffect(() => {
    updateBooking({
      checkInDate: '',
      checkOutDate: '',
      guests: "1",
      roomId: room?.roomID || null
    });
  }, [updateBooking, room]);

  // Move state updates inside useEffect

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    console.log(formData)
    updateBooking({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!isVerify) {
      setModalShow(true); // Show the modal only
      return;
    
    }
      handleClickRoom(room?.roomID);
   
    // Parse dữ liệu trước khi validate
    const dataToValidate = {
      ...formData,
      guests: parseInt(formData.guests),
      roomId: room?.roomID || null
    };
    
    if (validateBooking(dataToValidate)) {
      const nights = Math.ceil(
        (new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = parseFloat(room?.price) * nights;
      
      // Cập nhật booking với dữ liệu đã parse
      updateBooking({
        ...dataToValidate,
        totalPrice
      });
      navigate('/InputInfomation');
    }
  };

  const handleConfirm = () => {
    setModalShow(false); // Close the modal
    navigate("/login"); // Navigate to login
  };

  //ẩn modal đi khi click dấu X
  const onHide = () => {
    setModalShow(false);
  };


  return (
    <>
        <Card className="booking-card shadow position-sticky" style={{ top: "2rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="fs-3 fw-bold">{formatCurrency(room?.price)}</span>
            <span className="text-muted">/đêm</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="text-warning me-1">★</span>
            <span>{room?.danhGia}</span>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-2 mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="small fw-bold">
                  NHẬN PHÒNG <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control 
                  type="date" 
                  className="rounded-3"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
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
                  TRẢ PHÒNG <span className="text-danger">*</span> 
                </Form.Label>
                <Form.Control 
                  type="date" 
                  className="rounded-3"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
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
            <Form.Label className="small fw-bold">SỐ KHÁCH</Form.Label>
            <Form.Select
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="rounded-3"
            >
              {[...Array(room?.soNguoi || 1)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} khách
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button 
            type="submit" 
            className="w-100 mb-3 rounded-3"
            variant="primary"
          >
            Đặt phòng
          </Button>
        </Form>
      </Card.Body>
    </Card>


   { /* Modal Thông báo khi đặt phòng mà chưa đăng nhập */}
    <div
    className={`modal fade ${modalShow ? "show d-block" : ""}`}
    tabIndex="-1"
    style={{ backgroundColor: modalShow ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-white">Yêu cầu đăng nhập</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onHide}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p className="mb-0">
            Vui lòng đăng nhập để tiếp tục đặt phòng. Bạn sẽ được chuyển hướng đến trang đăng nhập.
          </p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
      );
}

BookingCard.propTypes = {
  room: PropTypes.shape({
    roomID: PropTypes.number,
    price: PropTypes.string,
    danhGia: PropTypes.number,
    soNguoi: PropTypes.number
  })
};

export default BookingCard;
