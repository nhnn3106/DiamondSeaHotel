import React from "react";

const UserActionDropdown = () => {
  return (
    <div
      className="user-action-dropdown position-absolute bg-white border p-3 rounded-4"
      style={{
        top: "60px",
        right: "0px",
        zIndex: 1001, // Thêm z-index để nằm trên FilterBar
      }}
    >
      <ul className="user-action-list list-unstyled">
        <li>Đăng ký</li>
        <li>Đăng nhập</li>
        <div className="w-100 border my-2"></div>
        <li>Cho thuê ở Airbnb</li>
        <li>Tổ chức trải nghiệm</li>
        <li>Trung tâm trợ giúp</li>
      </ul>
    </div>
  );
};

export default UserActionDropdown;
