import React from "react";
import { AiFillStar } from "react-icons/ai";
const RoomCard = () => {
  const roomInfo = {
    address: "Quận 7, Việt Nam",
    numberBed: "8 giường",
    rating: 4.84,
    price: 5700000,
    discount: 0.2,
    image1: "src/assets/images/example1.avif",
    image2: "src/assets/images/example2.avif",
    image3: "src/assets/images/example3.avif",
    image4: "src/assets/images/example4.avif",
    image5: "src/assets/images/example5.avif",
  };
  function formatPrice(price, locale = "vi-VN", currency = "VND") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(price);
  }

  return (
    <div className="" style={{ width: "500px", height: "300px" }}>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide h-100 w-100"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner w-100 h-100">
          <div className="carousel-item active w-100 h-100">
            <img
              src={roomInfo.image1}
              className="d-block img-fluid w-100 h-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="..."
            />
          </div>
          <div className="carousel-item w-100 h-100">
            <img
              src={roomInfo.image2}
              className="d-block img-fluid w-100 h-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="..."
            />
          </div>
          <div className="carousel-item w-100 h-100">
            <img
              src={roomInfo.image3}
              className="d-block img-fluid w-100 h-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
