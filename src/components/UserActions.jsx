import { Menu, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import UserActionDropdown from "./UserActionDropdown";

const UserActions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userActionRef = useRef(null); // Thêm ref để tham chiếu đến vùng UserAction

  const handleChangeShowDropdown = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    setShowDropdown(!showDropdown);
  };

  // Xử lý click bên ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userActionRef.current &&
        !userActionRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="user-action p-1 rounded-pill border border-secondary-subtle position-relative"
      onClick={handleChangeShowDropdown}
      ref={userActionRef} // Gắn ref vào vùng UserAction
      style={{ zIndex: 1999, cursor: "pointer" }}
    >
      <Menu size={23} />
      <div className="bg-secondary-subtle p-1 d-flex rounded-circle">
        <User size={20} />
      </div>
      {showDropdown && <UserActionDropdown />}
    </div>
  );
};

export default UserActions;