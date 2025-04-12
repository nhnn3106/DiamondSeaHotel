import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function InsideInfor() {
  const primaryPink = '#FF385C';
  const darkBackground = '#2C1B1A';
  const lightTextColor = '#EAEAEA';
  const statLabelColor = '#B0B0B0';

  const stats = [
    { value: "5", label: "Sao tiêu chuẩn" },
    { value: "2002", label: "Năm thành lập" },
    { value: "120+", label: "Nhân sự tận tâm" },
    { value: "98%", label: "Khách hàng hài lòng" },
  ];

  const sectionStyle = {
    backgroundColor: darkBackground,
    color: lightTextColor,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    overflow: 'hidden',
  };

  const h1Style = {
    fontSize: '2.8rem',
    color: primaryPink,
    fontWeight: '700',
    lineHeight: 1.2,
    textShadow: `1px 1px 3px rgba(255, 56, 92, 0.3)`,
  };

  const pStyle = {
    color: lightTextColor,
    lineHeight: 1.7,
    fontSize: '1.1rem',
  };

  const statValueStyle = {
    color: primaryPink,
    fontWeight: '700',
    fontSize: '3rem',
    marginBottom: '0.25rem',
  };

  const statLabelStyle = {
    color: statLabelColor,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const imgStyle = {
    borderRadius: '20px',
    objectFit: 'cover',
    height: '450px',
    width: '100%',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
    border: `3px solid ${primaryPink}`,
  };

  return (
    <Container as="section" fluid style={sectionStyle} className="my-0">
      <Container style={{ maxWidth: '1140px' }}>
        <Row xs={1} md={2} className="g-5 align-items-center">
          <Col md={{ order: 1 }} xs={{ order: 2 }} className="text-center text-md-start">
            <h1 style={h1Style} className="mb-4">
              Thông Tin Đặc Biệt
              <span className="d-block mt-2">Dành Riêng Cho Quý Khách</span>
            </h1>
            <p style={pStyle} className="mb-5">
              Tự hào mang đến không gian nghỉ dưỡng đẳng cấp, dịch vụ tận tâm và những trải nghiệm đáng nhớ nhất cho mọi khách lưu trú.
            </p>
            <Row xs={2} className="g-4 text-center">
              {stats.map((stat, index) => (
                <Col key={index} className="mb-3">
                  <div style={statValueStyle}>
                    {stat.value}
                  </div>
                  <div style={statLabelStyle}>{stat.label}</div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={{ order: 2 }} xs={{ order: 1 }} className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              alt="Nội thất khách sạn sang trọng"
              style={imgStyle}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
