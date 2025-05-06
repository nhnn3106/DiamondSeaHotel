import { useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RoomTypeContext } from "../context/RoomProvider";
import { useContext } from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/formatters";

const RoomCard = ({ id, price, bedType, bedCount, location, images }) => {
  const navigate = useNavigate();
  const { handleClickRoom } = useContext(RoomTypeContext);

  // State để theo dõi trạng thái của trái tim
  const [isFavorite, setIsFavorite] = useState(false);

  // Hàm xử lý khi ấn vào trái tim
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra card

    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    handleClickRoom(id);
    navigate(`/room/${id}`);
  };

  return (
    <Card
      id={id}
      style={{
        width: "18rem",
        height: "380px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        margin: "0 auto 20px auto",
      }}
      className="room-card border shadow-sm"
    >
      {/* Carousel với biểu tượng trái tim */}
      <div style={{ position: "relative", height: "220px" }}>
        <Carousel
          interval={null}
          indicators={true}
          controls={true}
          className="custom-carousel"
          style={{ borderRadius: "12px 12px 0 0" }}
        >
          {images.map((img) => (
            <Carousel.Item key={img.imageID}>
              <img
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                onClick={handleCardClick}
                loading="lazy"
                src={img.pathImg}
                alt=""
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Nội dung thẻ */}
      <Card.Body
        className="p-3"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Card.Title
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              marginBottom: "8px",
            }}
          >
            {location}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", color: "#6c757d" }}>
            {`${bedCount} giường ${bedType}`}
          </Card.Text>
        </div>
        <Card.Text
          style={{ fontSize: "14px", fontWeight: "bold", marginBottom: 0 }}
        >
          {formatCurrency(price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Add PropTypes validation
RoomCard.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  bedType: PropTypes.string.isRequired,
  bedCount: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default RoomCard;

const CustomHeart = ({ isFavourite, handleFavoriteClick }) => {
  return (
    <>
      {isFavourite ? (
        <FaHeart
          size={24}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            padding: "3px",
            cursor: "pointer",
            zIndex: 1,
          }}
          onClick={handleFavoriteClick}
        />
      ) : (
        <FaRegHeart
          size={24}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
            padding: "3px",
            cursor: "pointer",
            zIndex: 1,
          }}
          onClick={handleFavoriteClick}
        />
      )}
    </>
  );
};

CustomHeart.propTypes = {
  isFavourite: PropTypes.bool,
  handleFavoriteClick: PropTypes.func.isRequired,
};

CustomHeart.defaultProps = {
  isFavourite: false,
};
