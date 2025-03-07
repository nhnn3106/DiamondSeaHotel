import React, { useState } from "react";
import "./DatepickerModal.css";

const DatepickerModal = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  var firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  var lastDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const renderCells = () => {
    const rows = [];
    let dayCount = 1;

    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Create calendar rows
    for (let i = 0; i < 6; i++) {
      const cells = [];

      // Create cells for each day of the week
      for (let j = 0; j < 7; j++) {
        if (
          (i === 0 && j < firstDayOfWeek) ||
          dayCount > lastDayOfMonth.getDate()
        ) {
          // Empty cell
          cells.push(
            <td key={`${i}-${j}`} className="day-cell">
              <div></div>
            </td>
          );
        } else {
          // Day cell
          cells.push(
            <td key={`${i}-${j}`} className="day-cell">
              <div
                onClick={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      dayCount
                    )
                  )
                }
              >
                {dayCount}
              </div>
            </td>
          );
          dayCount++;
        }
      }

      rows.push(<tr key={i}>{cells}</tr>);

      // Stop if we've rendered all days
      if (dayCount > lastDayOfMonth.getDate()) break;
    }

    return rows;
  };

  return (
    <div className="datepopup-container position-fixed">
      <div className="datepopup">
        <div className="datepopup__month">
          Tháng {selectedDate.getMonth() + 1} năm {selectedDate.getFullYear()}
        </div>

        <div className="datepopup__date_list">
          <table>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>{renderCells()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatepickerModal;
