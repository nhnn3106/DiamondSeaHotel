import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

export const AuthProvider = ({ children }) => {
    const [isVerify, setIsVerify] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra xem người dùng đã đăng nhập hay chưa khi khởi động
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
                // Xử lý trường hợp dữ liệu trong localStorage bị hỏng
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Hàm đăng nhập
    const login = async (email, password) => {
        try {
            // Kiểm tra đầu vào
            if (!email || !password) {
                return {
                    success: false,
                    message: "Vui lòng nhập email và mật khẩu"
                };
            }

            const response = await api({
                method: 'post',
                url: '/login',
                data: { email, password }
            });

            // Kiểm tra response và response.data
            if (response && response.data) {
                if (response.data.success) {
                    const userData = response.data.user;

                    // Kiểm tra userData hợp lệ
                    if (!userData) {
                        return {
                            success: false,
                            message: "Dữ liệu người dùng không hợp lệ"
                        };
                    }

                    // Lưu thông tin người dùng vào localStorage
                    localStorage.setItem("user", JSON.stringify(userData));

                    // Cập nhật state
                    setUser(userData);
                    setIsAuthenticated(true);
                    setIsVerify(true);
                    return { success: true };
                } else {
                    return {
                        success: false,
                        message: response.data.message || "Đăng nhập thất bại"
                    };
                }
            } else {
                return {
                    success: false,
                    message: "Phản hồi từ máy chủ không hợp lệ"
                };
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            
            // Xử lý các loại lỗi khác nhau
            if (error.code === 'ECONNABORTED') {
                return {
                    success: false,
                    message: "Kết nối đến máy chủ bị gián đoạn. Vui lòng thử lại sau."
                };
            }
            
            if (error.code === 'ERR_NETWORK') {
                return {
                    success: false,
                    message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc máy chủ đã khởi động chưa."
                };
            }

            return {
                success: false,
                message: error.response?.data?.message || "Email hoặc mật khẩu không chính xác"
            };
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        setIsVerify(false);
    };

    // Hàm đăng ký
    const register = async (fullName, email, password) => {
        try {
            // Kiểm tra đầu vào
            if (!fullName || !email || !password) {
                return {
                    success: false,
                    message: "Vui lòng điền đầy đủ thông tin"
                };
            }

            const response = await api.post('/register', {
                userName: fullName,
                email,
                password
            });

            // Kiểm tra response và response.data
            if (response && response.data) {
                if (response.data.success) {
                    return { success: true };
                } else {
                    return {
                        success: false,
                        message: response.data.message || "Đăng ký thất bại"
                    };
                }
            } else {
                return {
                    success: false,
                    message: "Phản hồi từ máy chủ không hợp lệ"
                };
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            
            // Xử lý các loại lỗi khác nhau
            if (error.code === 'ECONNABORTED') {
                return {
                    success: false,
                    message: "Kết nối đến máy chủ bị gián đoạn. Vui lòng thử lại sau."
                };
            }
            
            if (error.code === 'ERR_NETWORK') {
                return {
                    success: false,
                    message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc máy chủ đã khởi động chưa."
                };
            }

            return {
                success: false,
                message: error.response?.data?.message || "Email đã được sử dụng hoặc có lỗi xảy ra"
            };
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const authContextValue = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        register,
        updateUser,
        isVerify
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

