import { Container, Row, Col, Form, Nav, Image } from "react-bootstrap";
// import "./index.css";
import { Link } from "react-router-dom";

function Errol404() {
  return (
    <div className="errol404-wrapper">
      <Container className="errol404-container">
        <Row className="align-items-center justify-content-center">
          <Col md={6} lg={5} className="errol404-text order-md-1">
            <h1 className="errol404-primary mb-3">Page Not Found</h1>
            <p className="errol404-light mb-3">
              We can't seem to find the page you're looking for. Please check
              the URL for any typos.
            </p>

            <Nav className="flex-column errol404-menu-links">
              <Nav.Link to="/" as={Link} className="errol404-primary">
                Go to Homepage
              </Nav.Link>
              <Nav.Link to="/contact" as={Link} className="errol404-primary">
                Contact support
              </Nav.Link>
            </Nav>
          </Col>
          <Col
            md={6}
            lg={5}
            className="errol404-image-col order-md-2 d-flex justify-content-center align-items-center"
          >
            <Image
              src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png"
              alt="Error illustration"
              fluid
              className="errol404-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Errol404;
