import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NoPage = () => {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="my-5">
            <h1
              style={{ fontSize: "8rem", fontWeight: "bold", color: "#d3d3d3" }}
            >
              404
            </h1>
            <h2 className="mb-4">Oops! Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className="d-flex justify-content-center mb-5">
              <svg width="250" height="120" viewBox="0 0 250 120">
                <path
                  d="M20,50 Q50,20 80,50 T140,50 T200,50 T230,50"
                  fill="none"
                  stroke="#6c757d"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <path
                  d="M30,50 L30,80 L40,70 M30,80 L20,70"
                  fill="none"
                  stroke="#6c757d"
                  strokeWidth="2"
                />
                <circle
                  cx="230"
                  cy="50"
                  r="15"
                  fill="#f8f9fa"
                  stroke="#6c757d"
                  strokeWidth="2"
                />
                <text
                  x="224"
                  y="55"
                  fontSize="16"
                  fontWeight="bold"
                  fill="#6c757d"
                >
                  ?
                </text>
              </svg>
            </div>
            <Link to="/">
              <Button variant="primary" className="rounded-pill px-4 py-2">
                Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NoPage;
