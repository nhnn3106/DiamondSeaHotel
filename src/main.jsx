import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App.jsx";
import RoomDetail from "./components/RoomDetail.jsx";
import { BrowserRouter } from "react-router-dom";
import { BookingProvider } from './context/BookingContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>
);
