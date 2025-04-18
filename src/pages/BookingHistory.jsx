import { useState, useEffect, useContext } from "react";
import "../Css/BookingHistory.css";
import { AuthContext } from "../context/AuthProvider";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
 
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ngày hiện tại (2025-04-15)
  const currentDate = new Date("2025-04-15");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.accountID) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/order/${user.accountID}`);
        const data = await response.json();

        if (data.success) {
          setBookings(data.data);
          setFilteredBookings(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu đơn đặt phòng");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
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
  const canCancelBooking = (checkInDate) => {
    const checkIn = new Date(checkInDate);
    return checkIn > currentDate;
  };

  // Hàm xử lý hủy phòng
  const handleCancelBooking = async (orderID) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này không?")) {
      try {
        const response = await fetch(`http://localhost:3000/order/${orderID}`, {
          method: 'DELETE'
        });
        const data = await response.json();

        if (data.success) {
          const updatedBookings = bookings.filter((booking) => booking.orderID !== orderID);
          setBookings(updatedBookings);
          applyFilters(updatedBookings, activeFilter, dateFilter);
        } else {
          alert(data.message || "Có lỗi xảy ra khi hủy đặt phòng");
        }
      } catch (err) {
        console.error("Error canceling booking:", err);
        alert("Có lỗi xảy ra khi hủy đặt phòng");
      }
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

    // Lọc theo loại (sắp đến/đã hoàn thành)
    if (filterType !== "all") {
      if (filterType === "upcoming") {
        result = result.filter(booking => new Date(booking.checkInDate) >= currentDate);
      } else if (filterType === "completed") {
        result = result.filter(booking => new Date(booking.checkOutDate) < currentDate);
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

  if (loading) {
    return (
      <div className="booking-history-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-history-wrapper">
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
              const canCancel = canCancelBooking(booking.checkInDate);
              const isCompleted = new Date(booking.checkInDate) < currentDate;

              return (
                <div key={booking.orderID} className={`booking-card ${isCompleted ? "completed" : "upcoming"}`}>
                  <div className="booking-card-header">
                    <div className="booking-card-image">
                      <img
                        style={{ width: "220px", height: "120px", objectFit: "cover"}}
                        src={booking.room.images[0] || "https://via.placeholder.com/220x120"}
                        alt={booking.room.name}
                      />
                      {isCompleted && <div className="status-badge completed">Đã hoàn thành</div>}
                      {!isCompleted && <div className="status-badge upcoming">Sắp đến</div>}
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
                        Tổng cộng: {booking.price} $
                      </p>
                    </div>
                    <div className="booking-actions">
                      {canCancel && (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelBooking(booking.orderID)}
                        >
                          Hủy phòng
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                      <button
                        className="details-btn"
                        onClick={() => toggleDetails(booking.orderID)}
                      >
                        {isExpanded ? "Ẩn chi tiết" : "Xem chi tiết"}
                        <i className={`fas fa-chevron-${isExpanded ? "up" : "down"}`}></i>
                      </button>
                    </div>
                  </div>

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
    </div>
  );
};

export default BookingHistory;