import React from "react"; 
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Share, Heart, Translate } from "react-bootstrap-icons";

const SHARE_BUTTON_TEXT = "Chia sẻ";
const SAVE_BUTTON_TEXT = "Lưu";
const SHARE_TOOLTIP_TEXT = "Chia sẻ địa điểm này";
const SAVE_TOOLTIP_TEXT = "Lưu vào danh sách yêu thích";

function ImageGallery({room}) {
  const renderTooltip = (props, tooltipText) => (
    <Tooltip id={`tooltip-${tooltipText.replace(/\s+/g, "-")}`} {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <div className="image-gallery">
      <Container className="my-4 py-2 header-container">
        <Row className="align-items-center">
          <Col>
            <h2 className="header-title">
              <Translate className="translate-icon" size={24} />
              <span>{room.name}</span>
            </h2>
          </Col>
          <Col xs="auto" className="ms-auto ps-md-3">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, SHARE_TOOLTIP_TEXT)}
            >
              <Button
                className="me-2 d-inline-flex align-items-center action-button"
                aria-label={SHARE_TOOLTIP_TEXT}
              >
                <Share size={18} />
                {SHARE_BUTTON_TEXT}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, SAVE_TOOLTIP_TEXT)}
            >
              <Button
                className="d-inline-flex align-items-center action-button"
                aria-label={SAVE_TOOLTIP_TEXT}
              >
                <Heart size={18} />
                {SAVE_BUTTON_TEXT}
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
      <Container className="image-gallery-container mb-4">
        <Row className="g-2">
          <Col md={6} className="main-image-col">
            <Image
              src={room.images[0].pathImg}
              fluid
              rounded
              className="h-100 gallery-image"
            />
          </Col>
          <Col md={6}>
            <Row className="g-2">
              {room.images.slice(1, 5).map((image, index) => (
                 <Col xs={6} key={image.imageID} className={index === 3 ? "position-relative" : ""}>
                   <Image
                     src={image.pathImg}
                     fluid
                     rounded
                     className="gallery-image thumbnail-image"
                   />
                 </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImageGallery;