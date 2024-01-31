// import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// import styled from "styled-components";

// const Wrapper = styled.div`
//    .MuiDateCalendar-root {
//       width: 100%;

//       .MuiDayCalendar-header {
//          justify-content: space-evenly;
//       }
//       .MuiPickersCalendarHeader-labelContainer {
//          .MuiPickersFadeTransitionGroup-root {
//             font-weight: 400;
//             font-size: 22px;
//             line-height: 29px;
//             color: #000000;
//          }
//          .MuiButtonBase-root {
//             display: none;
//          }
//       }
//       .MuiPickersSlideTransition-root {
//          min-height: 300px;
//       }
//       .MuiDayCalendar-weekContainer {
//          justify-content: space-evenly;
//       }
//       .MuiDayCalendar-weekDayLabel {
//          height: 45px;
//          width: 45px;
//          font-weight: 400;
//          font-size: 14px;
//          line-height: 19px;
//          color: #7a86a1;
//       }
//       .MuiPickersDay-dayOutsideMonth {
//          color: #707070 !important;
//       }
//       .MuiPickersDay-root {
//          height: 45px;
//          width: 45px;
//          font-weight: 400;
//          font-size: 16px;
//          line-height: 21px;
//          color: #000000;

//          &.MuiPickersDay-today {
//             border-radius: 18px;
//             border: none;
//             background: #ffffff;
//             filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.4));
//          }
//          &.Mui-selected {
//             background: #60269e;
//             color: #fff;
//             border-radius: 18px;
//          }
//       }
//    }
// `;

// const Calendar = () => {
//    return (
//       <Wrapper>
//          <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={1} />
//          </LocalizationProvider>
//       </Wrapper>
//    );
// };

// export default Calendar;

import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

import styled from "styled-components";

const Wrapper = styled.div`
  .p-calendar {
    width: 100%;
  }
  .p-datepicker {
    border: none;
    padding: 0;
    table td {
      padding: 0;
    }
  }
  .p-datepicker table td.p-datepicker-today > span {
    background: #60269e;
    color: #fff;
    border-radius: 16px;
  }
`;

const CalendarMain = ({ record }) => {
  const [date, setDate] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${(date.getMonth() < 9
      ? "0" + (date?.getMonth() + 1)
      : date?.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date
      ?.getDate()
      .toString()
      .padStart(2, "0")}/${date?.getFullYear()}`;

    return formattedDate.trim();
  };
  const createdAt = record?.map((item) => formatDate(item.createdAt));

  const dateTemplate = (date) => {
    const Date = `${date.month < 9 ? "0" + (date.month + 1) : date.month + 1}/${
      date.day
    }/${date.year}`;
    const isAccepted = createdAt?.includes(Date);
    console.log("isAccepted", isAccepted);

    const dotStyle = {
      width: "4px",
      height: "4px",
      backgroundColor: "#60269e",
      borderRadius: "50%",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "2px",
    };

    if (isAccepted) {
      return (
        <strong>
          {date.day} <span style={dotStyle}></span>
        </strong>
      );
    }
    return date.day;
  };

  return (
    <Wrapper>
      <Calendar
        value={date}
        onChange={(e) => setDate(e)}
        inline
        dateTemplate={dateTemplate}
      />
    </Wrapper>
  );
};

export default CalendarMain;
