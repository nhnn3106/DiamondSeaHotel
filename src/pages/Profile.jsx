import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, Nav, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
    const { isAuthenticated, user, logout, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("thongtin");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    // Form state cho thông tin cá nhân
    const [profileData, setProfileData] = useState({
        userName: "",
        email: "",
        sdt: "",
    });

    // Form state cho đổi mật khẩu
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Kiểm tra nếu chưa đăng nhập thì chuyển hướng về trang đăng nhập
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            // Lấy thông tin hiện tại của người dùng
            setProfileData({
                userName: user.userName || "",
                email: user.email || "",
                sdt: user.sdt || "",
            });
        }
    }, [isAuthenticated, navigate, user]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch("http://localhost:3000/accounts/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accountID: user.accountID,
                    userName: profileData.userName,
                    sdt: profileData.sdt,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Cập nhật thông tin người dùng trong context
                updateUser({
                    ...user,
                    userName: profileData.userName,
                    sdt: profileData.sdt,
                });

                setMessage({ type: "success", text: "Cập nhật thông tin thành công!" });
            } else {
                setMessage({ type: "danger", text: data.message || "Cập nhật thông tin thất bại!" });
            }
        } catch (error) {
            setMessage({ type: "danger", text: "Đã xảy ra lỗi khi cập nhật thông tin!" });
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        // Kiểm tra xác nhận mật khẩu
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "danger", text: "Mật khẩu xác nhận không khớp!" });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/accounts/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accountID: user.accountID,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
            } else {
                setMessage({ type: "danger", text: data.message || "Đổi mật khẩu thất bại!" });
            }
        } catch (error) {
            setMessage({ type: "danger", text: "Đã xảy ra lỗi khi đổi mật khẩu!" });
            console.error("Error changing password:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!isAuthenticated) {
        return null; // sẽ được chuyển hướng bởi useEffect
    }

    return (
        <>
            <Header />
            <Container className="py-5" style={{ marginTop: "250px" }}>
                <Row>
                    <Col lg={3} md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <div className="text-center mb-3">
                                    <div className="rounded-circle bg-secondary d-inline-flex justify-content-center align-items-center mb-3" style={{ width: "100px", height: "100px" }}>
                                        <span className="text-white display-4">{profileData.userName.charAt(0)}</span>
                                    </div>
                                    <h5 className="card-title">{profileData.userName}</h5>
                                    <p className="text-muted">{profileData.email}</p>
                                </div>

                                <Nav className="flex-column" variant="pills">
                                    <Nav.Link
                                        active={activeTab === "thongtin"}
                                        onClick={() => setActiveTab("thongtin")}
                                        className="mb-2"
                                    >
                                        Thông tin cá nhân
                                    </Nav.Link>
                                    <Nav.Link
                                        active={activeTab === "doimatkhau"}
                                        onClick={() => setActiveTab("doimatkhau")}
                                        className="mb-2"
                                    >
                                        Đổi mật khẩu
                                    </Nav.Link>
                                    <Button
                                        variant="outline-danger"
                                        className="w-100 mt-3"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={9} md={8}>
                        {message.text && (
                            <Alert variant={message.type} onClose={() => setMessage({ type: "", text: "" })} dismissible>
                                {message.text}
                            </Alert>
                        )}

                        <Card>
                            <Card.Body>
                                <Tab.Container activeKey={activeTab}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="thongtin">
                                            <h4 className="mb-4">Thông tin cá nhân</h4>
                                            <Form onSubmit={handleProfileSubmit}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Họ và tên</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="userName"
                                                        value={profileData.userName}
                                                        onChange={handleProfileChange}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        value={profileData.email}
                                                        disabled
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Email không thể thay đổi
                                                    </Form.Text>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="sdt"
                                                        value={profileData.sdt}
                                                        onChange={handleProfileChange}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={loading}>
                                                    {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                                                </Button>
                                            </Form>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="doimatkhau">
                                            <h4 className="mb-4">Đổi mật khẩu</h4>
                                            <Form onSubmit={handlePasswordSubmit}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="currentPassword"
                                                        value={passwordData.currentPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu mới</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="newPassword"
                                                        value={passwordData.newPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={passwordData.confirmPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={loading}>
                                                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                                                </Button>
                                            </Form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Profile; 