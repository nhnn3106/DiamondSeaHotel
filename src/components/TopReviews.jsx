import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

export default function TopReviews() {
  const gradientStart = '#6D2E46';
  const gradientEnd = '#4a2c2a';
  const headingColor = '#FFFFFF';
  const cardBgColor = 'rgba(42, 27, 26, 0.8)';
  const cardTextColor = '#EAEAEA';
  const starColor = '#ffc404';
  const authorNameColor = '#FFFFFF';
  const authorTitleColor = '#B0B0B0';

  const reviews = [
    {
      id: 1,
      name: "Hoài Nhân",
      avatar: "https://i.pravatar.cc/150?img=1",
      review:
        "Một kỳ nghỉ tuyệt vời! Khách sạn sạch sẽ, yên tĩnh và đội ngũ nhân viên rất nhiệt tình. Tôi cảm thấy hoàn toàn thư giãn và hài lòng.",
    },
    {
      id: 2,
      name: "Tấn Nghị",
      avatar: "https://i.pravatar.cc/150?img=2",
      review:
        "Không gian đẹp, dịch vụ chuyên nghiệp. Mọi thứ đều được chăm chút đến từng chi tiết. Đây chắc chắn sẽ là điểm đến yêu thích của tôi.",
    },
    {
      id: 3,
      name: "Tuấn Kiệt",
      avatar: "https://i.pravatar.cc/150?img=3",
      review:
        "Thật sự ấn tượng với sự chu đáo – từ phòng ốc đến phong cách phục vụ. Một nơi lý tưởng để nghỉ dưỡng cùng gia đình.",
    },
  ];

  const sectionStyle = {
    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  };

  const headingStyle = {
    color: headingColor,
    marginBottom: '3.5rem',
  };

  const cardStyle = {
    backgroundColor: cardBgColor,
    color: cardTextColor,
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    padding: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const starStyle = {
    color: starColor,
    height: '1.3rem',
    width: '1.3rem',
  };

  const reviewTextStyle = {
    color: cardTextColor,
    fontSize: '1rem',
    lineHeight: '1.6',
    fontStyle: 'italic',
  };

  const avatarStyle = {
    width: '55px',
    height: '55px',
    border: `2px solid ${starColor}`,
  };

  const authorNameStyle = {
    color: authorNameColor,
    fontWeight: '600',
  };

  const authorTitleStyle = {
    color: authorTitleColor,
    fontSize: '0.85rem',
  };

  return (
    <Container as="section" fluid style={sectionStyle} className="text-center">
      <Container style={{ maxWidth: '1140px' }}>
        <h2 className="display-5 fw-bold" style={headingStyle}>
          Khách Hàng Nói Gì Về Chúng Tôi?
        </h2>
        <Row xs={1} md={3} className="g-4 justify-content-center">
          {reviews.map((review) => (
            <Col key={review.id} className="d-flex align-items-stretch">
              <Card style={cardStyle}>
                <Card.Body className="d-flex flex-column text-center">
                  <div className="mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <StarFill
                        key={starIndex}
                        style={starStyle}
                        className="mx-1"
                      />
                    ))}
                  </div>
                  <Card.Text
                    style={reviewTextStyle}
                    className="mb-4 flex-grow-1"
                  >
                    "{review.review}"
                  </Card.Text>
                  <div className="d-flex flex-column align-items-center gap-2 mt-auto">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      roundedCircle
                      style={avatarStyle}
                    />
                    <div>
                      <div style={authorNameStyle}>{review.name}</div>
                      <div style={authorTitleStyle}>
                        Khách hàng thân thiết
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
