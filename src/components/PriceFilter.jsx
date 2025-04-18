import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from 'prop-types';
import { formatCurrency } from "../utils/formatters";

const PriceFilter = ({ priceRange, setPriceRange }) => {
  const [range, setRange] = useState({
    min: priceRange[0],
    max: priceRange[1],
  });
  
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Sync range with priceRange from props
  useEffect(() => {
    setRange({ min: priceRange[0], max: priceRange[1] });
  }, [priceRange]);

  const handleMinChange = (e) => {
    const min = parseInt(e.target.value);
    if (min <= range.max - 50000) {
      const newRange = { ...range, min };
      setRange(newRange);
      setPriceRange([newRange.min, newRange.max]);
    }
  };

  const handleMaxChange = (e) => {
    const max = parseInt(e.target.value);
    if (max >= range.min + 50000) {
      const newRange = { ...range, max };
      setRange(newRange);
      setPriceRange([newRange.min, newRange.max]);
    }
  };
  
  const handleApply = () => {
    setPriceRange([range.min, range.max]);
    setShowDropdown(false);
  };
  
  const handleReset = () => {
    const defaultRange = { min: 100000, max: 1500000 };
    setRange(defaultRange);
    setPriceRange([defaultRange.min, defaultRange.max]);
  };

  // Calculate percentage for custom range track
  const minPos = ((range.min - 0) / (1500000 - 0)) * 100;
  const maxPos = ((range.max - 0) / (1500000 - 0)) * 100;
  
  const isDefault = range.min === 100000 && range.max === 1500000;

  return (
    <div className="position-relative" style={{ minWidth: "200px" }}>
      <button
        className={`rounded-pill d-flex align-items-center gap-2 px-4 py-2 ${
          !isDefault ? "border-danger" : ""
        }`}
        style={{
          border: `1px solid ${!isDefault ? "#FF385C" : "#ddd"}`,
          backgroundColor: !isDefault ? "#FFF5F7" : "white",
          color: !isDefault ? "#FF385C" : "#222",
          transition: "all 0.3s ease",
          fontSize: "16px", 
          fontWeight: !isDefault ? "500" : "normal",
          width: "100%",
          minWidth: "200px"
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Giá phòng</span>
        {!isDefault && (
          <span className="ms-auto text-nowrap" style={{ fontSize: "15px", whiteSpace: "nowrap" }}>
            {formatCurrency(range.min)} - {formatCurrency(range.max)}
          </span>
        )}
        <ChevronDown size={16} style={{ color: "#FF385C", flexShrink: 0 }} />
      </button>
      
      {showDropdown && (
        <div 
          className="position-absolute bg-white border rounded-3 mt-2 p-4 shadow"
          style={{ 
            zIndex: 1000,  
            width: "400px", 
            right: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "95vw",
            maxHeight: "90vh",
            overflowY: "auto"
          }}
        >
          <h5 className="border-bottom pb-3 mb-3 fw-bold">Chọn khoảng giá</h5>
          
          {/* Thêm phần hiển thị khoảng giá đã chọn trước */}
          <div className="price-display text-center mb-4 p-3 bg-light rounded">
            <h6 className="fw-bold">Khoảng giá đã chọn:</h6>
            <div className="fs-5 text-primary fw-bold mb-0">
              {formatCurrency(range.min)} - {formatCurrency(range.max)}
            </div>
          </div>
          
          <div className="d-flex justify-content-between mb-4 gap-3">
            <div className="price-input w-50">
              <label className="form-label fw-bold">Giá tối thiểu</label>
              <div className="input-group">
                <span className="input-group-text">đ</span>
                <input 
                  type="number" 
                  className="form-control" 
                  value={range.min}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0 && value < range.max) {
                      setRange({...range, min: value});
                    }
                  }}
                  min="0"
                  max={range.max - 50000}
                  step="50000"
                />
              </div>
            </div>
            
            <div className="price-input w-50">
              <label className="form-label fw-bold">Giá tối đa</label>
              <div className="input-group">
                <span className="input-group-text">đ</span>
                <input 
                  type="number" 
                  className="form-control" 
                  value={range.max}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > range.min && value <= 1500000) {
                      setRange({...range, max: value});
                    }
                  }}
                  min={range.min + 50000}
                  max="1500000"
                  step="50000"
                />
              </div>
            </div>
          </div>
          
          {/* Thanh trượt */}
          <div className="mt-4 position-relative" style={{ height: "40px", padding: "10px 0" }}>
            {/* Custom track background */}
            <div
              className="position-absolute"
              style={{
                height: "6px",
                backgroundColor: "#ddd",
                borderRadius: "3px",
                top: "17px",
                zIndex: 0,
                left: 0,
                right: 0,
              }}
            ></div>

            {/* Active track section */}
            <div
              className="position-absolute"
              style={{
                height: "6px",
                backgroundColor: "#FF385C",
                borderRadius: "3px",
                top: "17px",
                left: `${minPos}%`,
                right: `${100 - maxPos}%`,
              }}
            ></div>

            <input
              type="range"
              min="0"
              max="1500000"
              step="50000"
              value={range.min}
              onChange={handleMinChange}
              className="position-absolute start-0 end-0"
              style={{
                zIndex: 2,
                top: 0,
                width: "100%",
                opacity: 0,
                cursor: "pointer",
                height: "40px",
              }}
            />
            <input
              type="range"
              min="0"
              max="1500000"
              step="50000"
              value={range.max}
              onChange={handleMaxChange}
              className="position-absolute start-0 end-0"
              style={{
                zIndex: 1,
                top: 0,
                width: "100%",
                opacity: 0,
                cursor: "pointer",
                height: "40px",
              }}
            />
            
            {/* Handles */}
            <div 
              className="position-absolute bg-white rounded-circle border border-danger shadow" 
              style={{
                width: "24px", 
                height: "24px",
                top: "8px",
                left: `calc(${minPos}% - 12px)`,
                zIndex: 3,
                cursor: "pointer",
              }}
            ></div>
            
            <div 
              className="position-absolute bg-white rounded-circle border border-danger shadow" 
              style={{
                width: "24px", 
                height: "24px",
                top: "8px",
                left: `calc(${maxPos}% - 12px)`,
                zIndex: 3,
                cursor: "pointer",
              }}
            ></div>
          </div>
          
          {/* Điểm đánh dấu */}
          <div className="d-flex justify-content-between px-2 mt-2 mb-4">
            <span className="small text-muted" style={{ fontSize: "12px" }}>0đ</span>
            <span className="small text-muted" style={{ fontSize: "12px" }}>500.000đ</span>
            <span className="small text-muted" style={{ fontSize: "12px" }}>1.000.000đ</span>
            <span className="small text-muted" style={{ fontSize: "12px" }}>1.500.000đ</span>
          </div>
          
          <div className="d-flex justify-content-between mt-4 pt-3 border-top">
            <button 
              className="btn btn-outline-secondary py-2 px-3" 
              onClick={handleReset}
            >
              Đặt lại
            </button>
            <button 
              className="btn btn-danger py-2 px-4"
              onClick={handleApply}
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay để đóng dropdown khi click ra ngoài */}
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            cursor: "default",
            background: "transparent"
          }}
        />
      )}
    </div>
  );
};

PriceFilter.propTypes = {
  priceRange: PropTypes.array.isRequired,
  setPriceRange: PropTypes.func.isRequired
};

export default PriceFilter;
