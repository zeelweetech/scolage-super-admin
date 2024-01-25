import DataTable from "react-data-table-component";
import React, { useState } from "react";
import { styled } from "styled-components";

const CheckStyles = styled.label`
   display: block;
   position: relative;
   padding-left: 35px;
   margin-bottom: 12px;
   cursor: pointer;
   font-size: 22px;
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
   input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
   }

   /* Create a custom checkbox */
   .checkmark {
      position: absolute;
      top: -10px;
      left: 0;
      height: 29px;
      width: 29px;
      background-color: #fff;
      border: 1px solid #707070;
      border-radius: 10px;
   }

   input {
      &:checked ~ .checkmark {
         background-color: #60269e;
         border-color: #60269e;
      }
   }
   .checkmark {
      &:after {
         content: "";
         position: absolute;
         display: none;
      }
   }

   input {
      &:checked ~ .checkmark:after {
         display: block;
      }
   }

   .checkmark {
      &:after {
         left: 10px;
         top: 5px;
         width: 7px;
         height: 13px;
         border: solid white;
         border-width: 0 3px 3px 0;
         -webkit-transform: rotate(45deg);
         -ms-transform: rotate(45deg);
         transform: rotate(45deg);
      }
   }
`;

const SearchboxStyles = styled.div`
   margin: 0 52px 48px;
   max-width: 500px;
   position: relative;

   input {
      border: 1px solid #707070;
      border-radius: 20px;
      padding: 18px 20px 18px 60px;
      font-weight: 400;
      width: 100%;
      font-size: 18px;
      line-height: 24px;
      outline: none;
      color: #000;
      &::placeholder {
         color: #7a86a1;
      }
   }

   label {
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
   }
`;

const DataTableStyles = styled.div`
   div[role="row"] {
      border: none !important;
   }
`;

const columns = [
   {
      name: "College's",
      selector: (row) => row.college,
   },
   {
      name: "City",
      selector: (row) => row.city,
   },
   {
      name: "Total Admissions",
      selector: (row) => row.totalAdmission,
   },
   {
      name: "Applied Admissions",
      selector: (row) => row.appliedAdmission,
   },
   {
      name: "onboard Status",
      selector: (row) => row.oStatus,
   },
   {
      name: "College Type 10+2 or 12+3",
      selector: (row) => row.cType,
   },
   {
      name: "Review Status",
      selector: (row) => row.rStatus,
   },
   {
      name: "Payment Status",
      selector: (row) => row.pStatus,
   },
];

const data = [
   {
      id: 1,
      college: "Narayana Jr college",
      city: "Hyderabad",
      totalAdmission: 367,
      appliedAdmission: 150,
      oStatus: "applied",
      cType: "10+2",
      rStatus: 4,
      pStatus: "paid",
   },
   {
      id: 2,
      college: "nothing",
      city: "Hyderabad",
      totalAdmission: 367,
      appliedAdmission: 150,
      oStatus: "applied",
      cType: "10+2",
      rStatus: 4,
      pStatus: "paid",
   },
];

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
   <CheckStyles className="container">
      <input type="checkbox" ref={ref} onClick={onClick} {...rest} />
      <span className="checkmark"></span>
   </CheckStyles>
));

const CollegeTable = () => {
   const [records, setRecords] = useState(data);

   const filterData = (event) => {
      const newData = data.filter((row) => {
         return (
            row.college.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.city.toLowerCase().includes(event.target.value.toLowerCase())
         );
      });

      setRecords(newData);
   };

   const handleSelectable = e => {
      console.log(e.selectedRows);
   }

   const conditionalRowStyles = [
      {
         when: row => row == row,
         style: {
            backgroundColor: '#fff',
         }
      }
   ]

   return (
      <>
         <SearchboxStyles>
            <label htmlFor="search">
               <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M21.826 20.246L18.195 16.711L18.109 16.582C17.9488 16.4249 17.7334 16.3369 17.509 16.3369C17.2847 16.3369 17.0692 16.4249 16.909 16.582C15.3989 17.947 13.4537 18.7321 11.4192 18.7976C9.38465 18.8632 7.39285 18.2049 5.79803 16.94C4.22402 15.7022 3.16757 13.9224 2.83477 11.9478C2.50198 9.97318 2.91668 7.94541 3.99801 6.26003C5.11146 4.55902 6.79462 3.31042 8.74548 2.73827C10.6963 2.16612 12.7872 2.30785 14.643 3.13802C16.4871 3.93096 17.9727 5.37791 18.814 7.20043C19.6553 9.02294 19.7928 11.0922 19.2 13.01C19.1561 13.1501 19.1507 13.2995 19.1845 13.4424C19.2183 13.5853 19.29 13.7164 19.392 13.822C19.4959 13.9293 19.6255 14.0081 19.7686 14.0508C19.9117 14.0936 20.0633 14.0988 20.209 14.066C20.3541 14.0348 20.4884 13.9659 20.5984 13.8662C20.7083 13.7664 20.7899 13.6394 20.835 13.498C21.546 11.2206 21.4017 8.762 20.4293 6.58333C19.4569 4.40466 17.7231 2.65554 15.553 1.66402C13.3683 0.629249 10.8898 0.393468 8.54916 0.99773C6.20849 1.60199 4.15388 3.00803 2.74304 4.97103C1.36847 6.91365 0.755396 9.29354 1.02032 11.6585C1.28524 14.0235 2.40969 16.2087 4.18002 17.799C5.97742 19.4194 8.28475 20.3605 10.7027 20.4595C13.1207 20.5585 15.4972 19.8091 17.421 18.341L20.636 21.471C20.7975 21.6255 21.0125 21.7118 21.236 21.7118C21.4596 21.7118 21.6745 21.6255 21.836 21.471C21.9137 21.3953 21.9757 21.305 22.0183 21.2053C22.061 21.1056 22.0835 20.9985 22.0847 20.89C22.0858 20.7816 22.0654 20.674 22.0248 20.5734C21.9842 20.4728 21.9241 20.3813 21.848 20.304L21.836 20.292L21.826 20.246Z"
                     fill="black"
                  />
               </svg>
            </label>
            <input type="text" id="search" onChange={filterData} placeholder="Search" />
         </SearchboxStyles>
         <DataTableStyles>
            <DataTable
               columns={columns}
               pagination
               data={records}
               selectableRows
               selectableRowsComponent={BootyCheckbox}
               selectableRowsHighlight
               onSelectedRowsChange={handleSelectable}
               conditionalRowStyles={conditionalRowStyles}
            />
         </DataTableStyles>
      </>
   );
};

export default CollegeTable;
