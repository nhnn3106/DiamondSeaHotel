/**
 * Định dạng số tiền sang định dạng tiền tệ Việt Nam
 * @param {number|string} amount - Số tiền cần định dạng
 * @returns {string} Số tiền đã định dạng với đơn vị đồng
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0đ';
  
  // Nếu amount là chuỗi, chuyển sang số
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Kiểm tra nếu là số hợp lệ
  if (isNaN(numericAmount)) return '0đ';
  
  // Định dạng với dấu phân cách hàng nghìn
  return numericAmount.toLocaleString('vi-VN') + 'đ';
}; 