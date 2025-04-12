import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra xem người dùng đã đăng nhập hay chưa khi khởi động
    useEffect(() => {
        const checkAuthStatus = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    // Hàm đăng nhập
    const login = (email, password) => {
        // Kiểm tra xem người dùng đã đăng ký chưa
        const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = registeredUsers.find(user => user.email === email && user.password === password);

        if (foundUser) {
            const userData = {
                email: foundUser.email,
                fullName: foundUser.fullName
            };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true };
        }

        return { success: false, message: "Email hoặc mật khẩu không chính xác" };
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    // Hàm đăng ký
    const register = (fullName, email, password) => {
        // Kiểm tra xem email đã tồn tại chưa
        const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (registeredUsers.some(user => user.email === email)) {
            return { success: false, message: "Email đã được sử dụng" };
        }

        // Thêm người dùng mới
        const newUser = { fullName, email, password };
        registeredUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(registeredUsers));

        return { success: true };
    };

    const authContextValue = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; 