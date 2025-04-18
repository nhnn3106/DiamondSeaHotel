import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatCurrency } from "../utils/formatters";

const CancelBookingModal = ({ showModal, onHide, onConfirm, booking }) => {
  return (
    <Modal 
      show={showModal} 
      onHide={onHide}
      centered
      backdrop="static"
      className="cancel-booking-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Xác nhận hủy đặt phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cancel-booking-details">
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            <span>Bạn đang hủy đặt phòng sau:</span>
          </div>
          
          {booking && (
            <div className="booking-info mb-3">
              <div className="room-info d-flex align-items-center mb-3">
                {booking.room?.images && booking.room.images[0] && (
                  <img 
                    src={booking.room.images[0]} 
                    alt={booking.room?.name || "Phòng"} 
                    className="img-thumbnail me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                )}
                <div>
                  <h5 className="mb-1">{booking.room?.name || "Phòng khách sạn"}</h5>
                  <p className="text-muted mb-0">{booking.room?.location || "Địa điểm"}</p>
                </div>
              </div>
              
              <div className="booking-dates d-flex justify-content-between mb-2">
                <div>
                  <strong>Ngày nhận phòng:</strong>
                  <div>{new Date(booking.checkInDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <strong>Ngày trả phòng:</strong>
                  <div>{new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}</div>
                </div>
              </div>
              
              <div className="booking-price">
                Tổng tiền: {formatCurrency(booking.price)}
              </div>
            </div>
          )}
          
          <div className="cancellation-policy mt-3">
            <h6><i className="fas fa-info-circle me-2"></i>Chính sách hủy phòng:</h6>
            <ul>
              <li>Hủy trước ngày nhận phòng ít nhất 7 ngày: Hoàn tiền 100%</li>
              <li>Hủy trước ngày nhận phòng 3-7 ngày: Hoàn tiền 50%</li>
              <li>Hủy trước ngày nhận phòng dưới 3 ngày: Không hoàn tiền</li>
            </ul>
          </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-2"></i>Đóng
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="fas fa-check me-2"></i>Xác nhận hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CancelBookingModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    orderID: PropTypes.number,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
    price: PropTypes.number,
    room: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.string,
      images: PropTypes.array
    })
  })
};

export default CancelBookingModal; 