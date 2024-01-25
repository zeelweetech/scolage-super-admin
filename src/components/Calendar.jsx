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
import { Calendar } from 'primereact/calendar';

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
   .p-datepicker table td.p-datepicker-today > span{
      background: #60269E;
      color: #fff;
      border-radius: 16px;
   }
`;

const CalendarMain = () => {
   const [date, setDate] = useState(null);

   return (
      <Wrapper>
         <Calendar value={date} onChange={(e) => setDate(e)} inline />
      </Wrapper>
   );
};

export default CalendarMain;
