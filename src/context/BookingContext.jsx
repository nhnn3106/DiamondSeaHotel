import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    roomId: null,
    totalPrice: 0
  });

  const [errors, setErrors] = useState({});

  const validateBooking = useCallback((data) => {
    const newErrors = {};
    
    if (!data.checkInDate) {
      newErrors.checkInDate = 'Vui lòng chọn ngày nhận phòng';
    }
    
    if (!data.checkOutDate) {
      newErrors.checkOutDate = 'Vui lòng chọn ngày trả phòng';
    } else if (data.checkInDate && new Date(data.checkOutDate) <= new Date(data.checkInDate)) {
      newErrors.checkOutDate = 'Ngày trả phòng phải sau ngày nhận phòng';
    }
    
    if (data.guests < 1) {
      newErrors.guests = 'Số khách phải lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const updateBooking = useCallback((newData) => {
    setBookingData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  console.log('BookingProvider mounted');

  return (
    <BookingContext.Provider value={{ 
      bookingData, 
      updateBooking, 
      errors,
      validateBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    console.log('useBooking must be used within a BookingProvider');
  }
  return context;
}; 