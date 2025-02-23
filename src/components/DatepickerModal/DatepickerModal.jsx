import React, { useState } from 'react'

const DatepickerModal = (props) => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  var firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  var lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  console.log(selectedDate);

  return (
    <div className='datepopup-container'>
      <div className='datepopup'>
        <div className='datepopup__month'>Tháng 2 năm 2025</div>
        <table className='datepopup__date_list table'>
        <thead>
          <tr>
            <th className='col-1' scope="col">Sun</th>
            <th className='col-1' scope="col">Mon</th>
            <th className='col-1' scope="col">Tue</th>
            <th className='col-1' scope="col">Web</th>
            <th className='col-1' scope="col">Thu</th>
            <th className='col-1' scope="col">Fri</th>
            <th className='col-1' scope="col">Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col day-cell"><div>1</div></td>
            <td className="col day-cell"><div>2</div></td>
            <td className="col day-cell"><div>3</div></td>
            <td className="col day-cell"><div>4</div></td>
            <td className="col day-cell"><div>5</div></td>
            <td className="col day-cell"><div>6</div></td>
            <td className="col day-cell"><div>7</div></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  )
};

// const renderCells = (firstDayOfMonth, lastDayOfMonth) => {
//   const rows = [];
  
//   //render a First week of month
//   var weekdays = [];

//   rows.push()

// }





export default DatepickerModal
