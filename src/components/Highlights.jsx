import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Clock, GeoAlt, StarFill } from 'react-bootstrap-icons';

export default function Highlights() {
  const primaryPink = '#FF385C';
  const darkShade = '#4a2c2a';
  const lightBgColor = 'rgba(255, 255, 255, 0.9)';
  const gradientStart = '#6D2E46';
  const gradientEnd = '#4a2c2a';

  const features = [
    {
      icon: Clock,
      title: "Nhận phòng linh hoạt",
      desc: "Thời gian nhận – trả phòng linh hoạt, phù hợp với mọi lịch trình của quý khách.",
    },
    {
      icon: GeoAlt,
      title: "Vị trí thuận tiện",
      desc: "Tọa lạc tại trung tâm, dễ dàng kết nối các điểm đến du lịch và ẩm thực hấp dẫn.",
    },
    {
      icon: StarFill,
      title: "Dịch vụ đẳng cấp",
      desc: "Đội ngũ chuyên nghiệp, tận tâm mang đến trải nghiệm nghỉ dưỡng vượt trội.",
    },
  ];

  const sectionStyle = {
    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    color: '#FFFFFF',
    paddingTop: '5rem',
    paddingBottom: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  };

  const cardStyle = {
    backgroundColor: lightBgColor,
    color: darkShade,
    borderRadius: '15px',
    border: 'none',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    padding: '1.5rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iconWrapperStyle = {
    backgroundColor: primaryPink,
    color: '#FFFFFF',
    height: '70px',
    width: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const iconStyle = {
    height: '2.2rem',
    width: '2.2rem',
  };

  const titleStyle = {
    color: darkShade,
    fontWeight: '600',
    fontSize: '1.3rem',
    marginBottom: '0.75rem',
  };

  const descStyle = {
    color: '#555555',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  };

  return (
    <Container as="section" fluid style={sectionStyle} className="text-center">
      <Container style={{ maxWidth: '1140px' }}>
        <h2 className="mb-5 display-5 fw-bold" style={{ color: '#FFFFFF' }}>Điểm Nổi Bật Của Chúng Tôi</h2>
        <Row xs={1} md={3} className="g-4 justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} className="d-flex align-items-stretch">
              <Card style={cardStyle}>
                <div style={iconWrapperStyle}>
                  <feature.icon style={iconStyle} />
                </div>
                <h4 style={titleStyle}>{feature.title}</h4>
                <p style={descStyle} className="mb-0">
                  {feature.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
