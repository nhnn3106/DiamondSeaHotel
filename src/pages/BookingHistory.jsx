import { useState, useEffect, useContext } from "react";
import "../Css/BookingHistory.css";
import { AuthContext } from "../context/AuthProvider";
import CancelBookingModal from "../components/CancelBookingModal";
import { formatCurrency } from "../utils/formatters";
import { Modal, Button } from "react-bootstrap";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMessageAccept, setShowMessageAccept] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showError, setShowError] = useState(false);

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [filteredBookings, setFilteredBookings] = useState([]);


  // Ngày hiện tại (2025-04-15)
  const currentDate = new Date("2025-04-15");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.accountID) return;

      try {
      
        const response = await fetch(`http://localhost:3000/order/${user.accountID}`);
        const data = await response.json();

        if (data.success) {
          setBookings(data.data);
          setFilteredBookings(data.data);
        } 
      } catch (err) {
        console.error("Error fetching orders:", err);
      } 
    };

    fetchOrders();
  }, [user?.accountID]);

  // Hàm tính số ngày giữa ngày nhận và trả phòng
  const tinhSoNgay = (ngayNhanPhong, ngayTraPhong) => {
    const ngayNhan = new Date(ngayNhanPhong);
    const ngayTra = new Date(ngayTraPhong);
    const soMiligiayTrongMotNgay = 1000 * 60 * 60 * 24;
    const soNgay = Math.round((ngayTra - ngayNhan) / soMiligiayTrongMotNgay);
    return soNgay > 0 ? soNgay : 1;
  };

  // Hàm kiểm tra xem có thể hủy phòng không
  const canCancelBooking = (booking) => {
    const checkIn = new Date(booking.checkInDate);
    // Don't allow cancellation of already canceled bookings
    return checkIn > currentDate && booking.status !== 'canceled';
  };

  // Mở modal xác nhận hủy đặt phòng
  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  // Hàm xử lý hủy phòng
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    
    try {
      const response = await fetch(`http://localhost:3000/order/${selectedBooking.orderID}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        // Update the booking status in the UI instead of removing it
        const updatedBookings = bookings.map((booking) => 
          booking.orderID === selectedBooking.orderID 
            ? { ...booking, status: 'canceled', attribute: 'Đã hủy' } 
            : booking
        );
        setBookings(updatedBookings);
        applyFilters(updatedBookings, activeFilter, dateFilter);
        setShowMessageAccept(true);
        
        // Hiển thị thông báo thành công
        setTimeout(() => {
          setShowMessageAccept(false);
        }, 3000);
      } else {
        //sét hiển thị không thể hủy vì quá ngày cho phép hủy
        setShowError(true);
      }
    } catch {
      // Simplified error handling without using a variable
      console.error("Error canceling booking");
      alert("Có lỗi xảy ra khi hủy đặt phòng");
    } finally {
      setShowCancelModal(false);
    }
  };

  // Hàm hiển thị sao đánh giá
  const renderStars = (danhGia) => {
    const stars = [];
    const maxStars = 5;
    const rating = Math.floor(parseFloat(danhGia));
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star1" : "star-empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Hàm toggle trạng thái mở rộng
  const toggleDetails = (orderID) => {
    setExpanded((prev) => ({
      ...prev,
      [orderID]: !prev[orderID],
    }));
  };

  // Áp dụng tất cả bộ lọc
  const applyFilters = (data, filterType, dateRange) => {
    let result = [...data];

    // Lọc theo loại (sắp đến/đã hoàn thành/đã hủy)
    if (filterType !== "all") {
      if (filterType === "upcoming") {
        // Chỉ hiển thị đơn sắp đến (status là upcoming hoặc không có status) và ngày nhận phòng trong tương lai
        result = result.filter(booking => 
          (booking.status === 'upcoming' || !booking.status) && 
          new Date(booking.checkInDate) >= currentDate
        );
      } else if (filterType === "completed") {
        // Chỉ hiển thị đơn đã hoàn thành (status là completed hoặc ngày trả phòng đã qua)
        result = result.filter(booking => 
          booking.status === 'completed' || 
          (booking.status !== 'canceled' && new Date(booking.checkOutDate) < currentDate)
        );
      } else if (filterType === "canceled") {
        // Chỉ hiển thị đơn đã hủy (status là canceled)
        result = result.filter(booking => booking.status === 'canceled');
      }
    }

    // Lọc theo khoảng ngày nếu có
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      result = result.filter(booking => {
        const checkIn = new Date(booking.checkInDate);
        return checkIn >= startDate && checkIn <= endDate;
      });
    }

    setFilteredBookings(result);
  };

  // Xử lý thay đổi bộ lọc theo trạng thái
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    applyFilters(bookings, filter, dateFilter);
  };

  // Xử lý thay đổi bộ lọc theo ngày
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    const newDateFilter = { ...dateFilter, [name]: value };
    setDateFilter(newDateFilter);
    
    if (newDateFilter.startDate && newDateFilter.endDate) {
      applyFilters(bookings, activeFilter, newDateFilter);
    }
  };

  // Xử lý xóa bộ lọc
  const clearFilters = () => {
    setActiveFilter("all");
    setDateFilter({ startDate: "", endDate: "" });
    setFilteredBookings(bookings);
  };

  // Hàm hiển thị ảnh dịch vụ
  const renderServiceImages = (services) => {
    return services.map((service, index) => (
      <div key={index} className="service-image-container">
        <img 
          src={service} 
          alt={service}
          className="service-image"
        />
      </div>
    ));
  };



  return (
    <div className="booking-history-wrapper">
      {/* Thông báo hủy phòng thành công */}
      {showMessageAccept && (
        <div className="success-notification">
          <div className="success-content">
            <i className="fas fa-check-circle"></i>
            <span>Hủy đặt phòng thành công!</span>
          </div>
        </div>
      )}

      <div className="booking-history-container">
        {/* Header */}
        <div className="booking-history-header">
          <h1>Lịch Sử Đặt Phòng</h1>
          <p className="subtitle">Xem lại các đặt phòng của bạn</p>
        </div>

        {/* Bộ lọc */}
        <div className="booking-filters">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              Tất cả
            </button>
            <button 
              className={`filter-tab ${activeFilter === "upcoming" ? "active" : ""}`}
              onClick={() => handleFilterChange("upcoming")}
            >
              Sắp đến
            </button>
            <button 
              className={`filter-tab ${activeFilter === "completed" ? "active" : ""}`}
              onClick={() => handleFilterChange("completed")}
            >
              Đã hoàn thành
            </button>
            <button 
              className={`filter-tab ${activeFilter === "canceled" ? "active" : ""}`}
              onClick={() => handleFilterChange("canceled")}
            >
              Đã hủy
            </button>
          </div>

          <div className="date-filter">
            <div className="date-inputs">
              <div className="date-input-group">
                <label htmlFor="startDate">Từ ngày:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={dateFilter.startDate}
                  onChange={handleDateFilterChange}
                />
              </div>
              <div className="date-input-group">
                <label htmlFor="endDate">Đến ngày:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={dateFilter.endDate}
                  onChange={handleDateFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hiển thị số lượng kết quả */}
        <div className="filter-result-count">
          Tìm thấy <span>{filteredBookings.length}</span> đơn đặt phòng
        </div>

        <div className="booking-list">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <p>Không tìm thấy đơn đặt phòng nào phù hợp với bộ lọc.</p>
              <button className="reset-filter-btn" onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const soNgay = tinhSoNgay(booking.checkInDate, booking.checkOutDate);
              const isExpanded = expanded[booking.orderID] || false;
              const canCancel = canCancelBooking(booking);
              const isCompleted = new Date(booking.checkInDate) < currentDate;

              return (
                <div key={booking.orderID} className={`booking-card ${booking.status === 'canceled' ? "canceled" : (isCompleted ? "completed" : "upcoming")}`}>
                  <div className="booking-card-header">
                    <div className="booking-card-image">
                      <img
                        style={{ width: "220px", height: "120px", objectFit: "cover"}}
                        src={booking.room.images[0] || "https://via.placeholder.com/220x120"}
                        alt={booking.room.name}
                      />
                      {booking.status === 'canceled' ? (
                        <div className="status-badge canceled">Đã hủy</div>
                      ) : isCompleted ? (
                        <div className="status-badge completed">Đã hoàn thành</div>
                      ) : (
                        <div className="status-badge upcoming">Sắp đến</div>
                      )}
                    </div>
                    <div className="booking-card-info">
                      <h3 className="booking-title">
                        {booking.room.name} - {booking.room.roomType.roomTypeName}
                      </h3>
                      <p className="booking-dates">
                        <span>
                          <i className="fas fa-calendar-check"></i>{" "}
                          {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}
                        </span>
                        <span>-</span>
                        <span>
                          <i className="fas fa-calendar-times"></i>{" "}
                          {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                        </span>
                      </p>
                      <p className="booking-price">
                        Tổng cộng: {formatCurrency(booking.price)}
                      </p>
                    </div>
                    <div className="booking-actions">
                      {canCancel && booking.status !== 'canceled' && (
                        <button
                          className="cancel-btn"
                          onClick={() => openCancelModal(booking)}
                        >
                          Hủy phòng
                          <i className="fas fa-times ms-2"></i>
                        </button>
                      )}
                      <button
                        className="details-btn"
                        onClick={() => toggleDetails(booking.orderID)}
                      >
                        {isExpanded ? "Ẩn chi tiết" : "Xem chi tiết"}
                        <i className={`fas fa-chevron-${isExpanded ? "up" : "down"} ms-2`}></i>
                      </button>
                    </div>
                  </div>


                  {showError && (
                    <Modal show={showError} onHide={() => setShowError(false)}>
                      <Modal.Header closeButton >
                        <Modal.Title className="text-white">Thông báo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="fw-bold">Không thể hủy đặt phòng vì quá ngày cho phép hủy</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowError(false)}>
                          Đóng
                        </Button>
                      </Modal.Footer>
                      
                    </Modal>
                  )}
                  

                  {isExpanded && (
                    <div className="booking-card-details">
                      <div className="separator"></div>
                      <h4>Chi tiết đặt phòng</h4>
                      <div className="booking-info">
                        <div className="booking-info-row">
                          <span className="label">Mã đặt phòng:</span>
                          <span className="value highlight">#{booking.orderID}</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Ngày đặt:</span>
                          <span className="value">{new Date(booking.orderDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Tên phòng:</span>
                          <span className="value">{booking.room.name}</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Vị trí:</span>
                          <span className="value">{booking.room.location}</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Diện tích:</span>
                          <span className="value">{booking.room.dienTich} m²</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Loại giường:</span>
                          <span className="value">
                            {booking.room.bedType} (Số lượng: {booking.room.bedCount})
                          </span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Số ngày:</span>
                          <span className="value">{soNgay} ngày</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Loại phòng:</span>
                          <span className="value">
                            {booking.room.roomType.roomTypeName} ({booking.room.soNguoi} người)
                          </span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Đánh giá:</span>
                          <span className="value">
                            {renderStars(booking.room.danhGia)} {booking.room.danhGia}/5
                          </span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Mô tả:</span>
                          <span className="value">{booking.room.moTa}</span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Hình thức thanh toán:</span>
                          <span className="value">{booking.type} </span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Tiện ích:</span>
                          <span className="value">
                            {booking.room.amenities.map((amenity, index) => (
                              <span key={index} className="badge">
                                {amenity}
                              </span>
                            ))}
                          </span>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Dịch vụ:</span>
                          <div className="services-container">
                            {renderServiceImages(booking.room.services)}
                          </div>
                        </div>
                        <div className="booking-info-row">
                          <span className="label">Hình ảnh phòng:</span>
                          <div className="image-gallery">
                            {booking.room.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Room ${index + 1}`}
                                className="room-image"
                                onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal xác nhận hủy đặt phòng */}
      <CancelBookingModal 
        showModal={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
        booking={selectedBooking}
      />

      


    </div>
    
  );
};

export default BookingHistory;