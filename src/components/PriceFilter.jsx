import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
    if (min <= range.max - 10) {
      const newRange = { ...range, min };
      setRange(newRange);
      setPriceRange([newRange.min, newRange.max]);
    }
  };

  const handleMaxChange = (e) => {
    const max = parseInt(e.target.value);
    if (max >= range.min + 10) {
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
    const defaultRange = { min: 50, max: 500 };
    setRange(defaultRange);
    setPriceRange([defaultRange.min, defaultRange.max]);
  };

  // Calculate percentage for custom range track
  const minPos = ((range.min - 0) / (1000 - 0)) * 100;
  const maxPos = ((range.max - 0) / (1000 - 0)) * 100;
  
  const isDefault = range.min === 50 && range.max === 500;

  return (
    <div className="position-relative">
      <button
        className={`rounded-pill d-flex align-items-center gap-2 px-3 py-2 ${
          !isDefault ? "border-danger" : ""
        }`}
        style={{
          border: `1px solid ${!isDefault ? "#FF385C" : "#ddd"}`,
          backgroundColor: !isDefault ? "#FFF5F7" : "white",
          color: !isDefault ? "#FF385C" : "#222",
          transition: "all 0.3s ease",
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Giá phòng</span>
        {!isDefault && (
          <span>{`${range.min}$ - ${range.max}$`}</span>
        )}
        <ChevronDown size={16} style={{ color: "#FF385C" }} />
      </button>
      
      {showDropdown && (
        <div 
          className="position-absolute bg-white border rounded-3 mt-2 p-3 shadow-sm"
          style={{ zIndex: 1000, width: "300px", right: 0 }}
        >
          <h5 className="border-bottom pb-2">Chọn khoảng giá</h5>
          
          <div className="d-flex justify-content-between mb-2 mt-3">
            <div className="price-input">
              <label className="form-label small text-muted">Tối thiểu</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
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
                  max={range.max - 10}
                />
              </div>
            </div>
            
            <div className="mx-2 d-flex align-items-center mt-4">—</div>
            
            <div className="price-input">
              <label className="form-label small text-muted">Tối đa</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  className="form-control" 
                  value={range.max}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > range.min && value <= 1000) {
                      setRange({...range, max: value});
                    }
                  }}
                  min={range.min + 10}
                  max="1000"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-3 position-relative" style={{ height: "40px", padding: "10px 0" }}>
            {/* Custom track background */}
            <div
              className="position-absolute"
              style={{
                height: "4px",
                backgroundColor: "#ddd",
                borderRadius: "3px",
                top: "18px",
                zIndex: 0,
                left: 0,
                right: 0,
              }}
            ></div>

            {/* Active track section */}
            <div
              className="position-absolute"
              style={{
                height: "4px",
                backgroundColor: "#FF385C",
                borderRadius: "3px",
                top: "18px",
                left: `${minPos}%`,
                right: `${100 - maxPos}%`,
              }}
            ></div>

            <input
              type="range"
              min="0"
              max="1000"
              value={range.min}
              onChange={handleMinChange}
              className="position-absolute start-0 end-0 slider-min"
              style={{
                zIndex: 2,
                top: 0,
                width: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={range.max}
              onChange={handleMaxChange}
              className="position-absolute start-0 end-0 slider-max"
              style={{
                zIndex: 1,
                top: 0,
                width: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
            
            {/* Handles */}
            <div 
              className="position-absolute bg-white rounded-circle border border-danger" 
              style={{
                width: "20px", 
                height: "20px",
                top: "10px",
                left: `calc(${minPos}% - 10px)`,
                zIndex: 3,
                cursor: "pointer",
              }}
            ></div>
            
            <div 
              className="position-absolute bg-white rounded-circle border border-danger" 
              style={{
                width: "20px", 
                height: "20px",
                top: "10px",
                left: `calc(${maxPos}% - 10px)`,
                zIndex: 3,
                cursor: "pointer",
              }}
            ></div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-sm btn-link text-secondary" 
              onClick={handleReset}
            >
              Đặt lại
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={handleApply}
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
