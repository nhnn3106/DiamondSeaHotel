import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h5>Hỗ trợ</h5>
              <ul className="footer-links">
                <li>
                  <a href="#">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a href="#">Hỗ trợ người khuyết tật</a>
                </li>
                <li>
                  <a href="#">Tùy chọn hủy</a>
                </li>
                <li>
                  <a href="#">Báo cáo vấn đề khu dân cư</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h5>Cộng đồng</h5>
              <ul className="footer-links">
                <li>
                  <a href="#">Chống phân biệt đối xử</a>
                </li>
                <li>
                  <a href="#">Quan hệ đối tác</a>
                </li>
                <li>
                  <a href="#">Trở thành chủ nhà</a>
                </li>
                <li>
                  <a href="#">Tiếp thị liên kết</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h5>Đón tiếp khách</h5>
              <ul className="footer-links">
                <li>
                  <a href="#">Đón tiếp khách có trách nhiệm</a>
                </li>
                <li>
                  <a href="#">Bảo hiểm cho chủ nhà</a>
                </li>
                <li>
                  <a href="#">Tài nguyên cho chủ nhà</a>
                </li>
                <li>
                  <a href="#">Hướng dẫn đón tiếp khách</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h5>Giới thiệu</h5>
              <ul className="footer-links">
                <li>
                  <a href="#">Tin tức</a>
                </li>
                <li>
                  <a href="#">Nhà đầu tư</a>
                </li>
                <li>
                  <a href="#">Cơ hội nghề nghiệp</a>
                </li>
                <li>
                  <a href="#">Quy tắc an toàn & điều khoản</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-8 col-sm-6">
              <div className="copyright">
                © 2025 Booking, Inc. · <a href="#">Quyền riêng tư</a> ·{" "}
                <a href="#">Điều khoản</a> · <a href="#">Sơ đồ trang web</a>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="language-currency">
                <select className="language-select">
                  <option value="vi">Tiếng Việt (VN)</option>
                  <option value="en">English (US)</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <select className="currency-select">
                  <option value="vnd">VND</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
