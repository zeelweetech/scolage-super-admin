import { useState } from "react";
import styled from "styled-components";
import transactions from "../../helper/Transactions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

import { Dropdown } from "primereact/dropdown";

const Wrapper = styled.div`
   border: 1px solid #707070;
   border-radius: 30px;
   padding: 38px 32px;
`;

const DatatableStyles = styled.div`
   .p-rating .p-rating-item .p-rating-icon {
      color: #707070;
   }
   .p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
      color: #fdd400;
   }

   .p-datatable .p-datatable-thead {
      position: relative;

      &::before {
         content: "";
         position: absolute;
         bottom: 7px;
         left: 0;
         height: 1px;
         width: 100%;
         background: #707070;
      }
   }

   .p-datatable .p-datatable-thead > tr > th {
      border-color: transparent !important;
      background: #fff;
   }

   .p-datatable .p-datatable-tbody tr {
      background: #fff;
      border: 2px solid transparent !important;
      border-top: none !important;
      border-radius: 20px !important;
      position: relative;
      z-index: 1;
   }

   .p-datatable .p-datatable-tbody tr.p-highlight {
      background: #fff;
      outline: 1px solid #60269e !important;
   }

   .p-datatable .p-datatable-tbody > tr > td {
      border: none !important;
   }

   .p-datatable .p-datatable-tbody tr td {
      &:last-child {
         padding-right: 0px;
      }
   }

   .p-datatable .p-paginator-bottom {
      border: none !important;
   }

   .p-checkbox .p-checkbox-box {
      box-shadow: none !important;
   }

   .p-checkbox .p-checkbox-box.p-highlight {
      border-color: #60269e;
      background: #60269e;
   }

   .payment-status {
      background: #f6efff;
      border-radius: 12px;
      padding: 6px 38px 10px;
      font-weight: 400;
      font-size: 19px;
      line-height: 25px;
      text-transform: capitalize;

      &.paid {
         color: #60269e;
         background: #f6efff;
      }
      &.pending {
         color: #f9b035;
         background: #fff8eb;
      }
   }
   .onboard-status {
      font-weight: 400;
      font-size: 19px;
      line-height: 25px;
      text-transform: capitalize;

      &.applied {
         color: #2fc41e;
      }
      &.pending {
         color: #f96767;
      }
   }

   .p-paginator .p-dropdown {
      order: -1;
   }
   .p-paginator .p-paginator-first,
   .p-paginator .p-paginator-last {
      display: none;
   }

   .p-datatable-header {
      background: none;
      border: none;
   }

   @media (min-width: 768px) and (max-width: 1800px) {
      .p-datatable.p-datatable-lg .p-datatable-header {
         padding: 0px;
      }
   }
`;

const InvoiceBtnStyles = styled.button`
   display: flex;
   align-items: center;
   gap: 10px;
   font-weight: 400;
   font-size: 14px;
   line-height: 19px;
   color: #7a86a1;

   svg {
      width: 15px;
   }
`;

const StatusStyles = styled.p`
   font-weight: 400;
   font-size: 14px;
   line-height: 19px;
   color: #7a86a1;
   position: relative;
   text-transform: capitalize;
   padding-left: 17px;

   &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-49%);
      height: 8px;
      width: 8px;
      background: #60269e;
      border-radius: 50%;
   }
`;

const SearchboxStyles = styled.div`
   /* margin: 0 52px 48px; */
   max-width: 358px;
   width: 500px;
   position: relative;

   input {
      border: 1px solid #707070;
      border-radius: 16px;
      padding: 9px 20px 10px 50px;
      font-weight: 400;
      width: 100%;
      font-size: 14px;
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

const TableHeaderStyles = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
   justify-content: space-between;

   .Theader-right {
      display: flex;
      align-items: center;
      gap: 28px;

      .month-select {
         .p-dropdown {
            box-shadow: none !important;
            background: #ffffff;
            border: 1px solid #707070;
            border-radius: 20px;

            .p-dropdown-label {
               padding: 13px 0px 13px 14px;
               font-weight: 400;
               font-size: 14px;
               line-height: 19px;
               color: #7a86a1;
            }
         }
      }
      .days-select {
         .p-dropdown {
            box-shadow: none !important;
            background: #ffffff;
            border: 1px solid #707070;
            border-radius: 20px;

            .p-dropdown-label {
               padding: 13px 0px 13px 14px;
               font-weight: 400;
               font-size: 14px;
               line-height: 19px;
               color: #7a86a1;
            }
         }
      }

      button {
         width: 44px;
         height: 44px;
         display: flex;
         align-items: center;
         justify-content: center;
         background: #ffffff;
         border: 1px solid #707070;
         border-radius: 16px;
         filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));

         &:last-child {
            filter: none;
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      .Theader-right {
         gap: 10px;
      }
   }
`;

const TransactionHistoryTable = () => {
   const [record, setRecord] = useState(transactions);
   const [selectedProducts, setSelectedProducts] = useState([]);

   const withdrawBodyTemplate = (record) => {
      return <p style={{ color: "#000" }}>#{record.withdraw}</p>;
   };

   const AdmissionAmountTemplate = (record) => {
      return <>{record.admissionAmount ? <p>{record.admissionAmount}</p> : <p>-----</p>}</>;
   };

   const statusTemplate = (record) => {
      return <StatusStyles>{record.status}</StatusStyles>;
   };

   const invoiceTemplate = (record) => {
      return (
         <InvoiceBtnStyles onClick={() => alert("Download Invoice " + record.id)}>
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M7.91899 3.78589V0.621826C7.91248 0.464752 7.96847 0.311519 8.07475 0.195679C8.18104 0.079838 8.32896 0.0109173 8.48601 0.00390625C8.63296 0.00464488 8.77428 0.0603942 8.88219 0.160156C8.99009 0.259918 9.05671 0.396401 9.06896 0.542847L9.07396 0.621826V3.78589H12.661C13.5547 3.82334 14.3999 4.20299 15.0214 4.84631C15.643 5.48964 15.9933 6.34731 16 7.24182V11.3889C16.0304 12.2822 15.7187 13.1533 15.1284 13.8245C14.5381 14.4956 13.7138 14.916 12.824 14.9999H4.32396C3.43045 14.9636 2.58538 14.5841 1.96471 13.9403C1.34404 13.2965 0.995631 12.4381 0.991991 11.5438V7.3999C0.961876 6.50801 1.27273 5.63811 1.86125 4.96729C2.44978 4.29646 3.27174 3.87503 4.15996 3.78882H4.31597H7.916V8.83984L6.71599 7.53491C6.66605 7.47887 6.60512 7.4337 6.53697 7.40222C6.46883 7.37075 6.39491 7.35362 6.31987 7.35193C6.24483 7.35024 6.17024 7.36396 6.10076 7.39233C6.03127 7.42071 5.96841 7.46311 5.916 7.51685L5.89897 7.53491C5.80388 7.64587 5.7468 7.78432 5.73601 7.93005C5.72521 8.07578 5.76127 8.22109 5.83898 8.34485L5.89897 8.42383L8.08299 10.8029C8.12933 10.8566 8.18581 10.9007 8.24919 10.9326C8.31258 10.9645 8.38161 10.9836 8.45238 10.9888C8.52315 10.994 8.59424 10.9852 8.66161 10.9629C8.72897 10.9406 8.79126 10.9053 8.84496 10.8589L8.90099 10.8029L11.085 8.42383C11.1939 8.30136 11.254 8.14324 11.254 7.97937C11.254 7.8155 11.1939 7.65738 11.085 7.53491C10.9915 7.43071 10.8617 7.36633 10.7222 7.35498C10.5826 7.34363 10.4441 7.38615 10.335 7.47388L10.271 7.53491L9.07799 8.83484V3.78394L7.91899 3.78589Z"
                  fill="#707070"
               />
            </svg>
            PDF
         </InvoiceBtnStyles>
      );
   };

   const viewTemplate = (record) => {
      return (
         <button>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M8.48096 12C5.38096 12 2.59996 9.83606 1.03296 6.21106C1.00402 6.14343 0.989136 6.07051 0.989136 5.99695C0.989136 5.92338 1.00402 5.85059 1.03296 5.78296C2.59796 2.16196 5.38196 0.000976562 8.48096 0.000976562H8.48901C10.0539 0.0160557 11.5683 0.556701 12.7889 1.53601C14.1786 2.66542 15.2618 4.12629 15.939 5.78406C15.9679 5.85169 15.9829 5.92448 15.9829 5.99805C15.9829 6.07161 15.9679 6.1444 15.939 6.21204C14.374 9.83704 11.587 12.001 8.48596 12.001L8.48096 12ZM5.56396 6C5.56081 6.5785 5.72933 7.14493 6.0481 7.62769C6.36687 8.11044 6.82161 8.48786 7.35486 8.71216C7.88811 8.93646 8.47595 8.99757 9.04395 8.88782C9.61194 8.77806 10.1346 8.5024 10.5459 8.09558C10.9572 7.68876 11.2386 7.16906 11.3546 6.60229C11.4706 6.03553 11.4158 5.44705 11.1974 4.91138C10.9789 4.3757 10.6066 3.91693 10.1273 3.5929C9.64808 3.26886 9.0835 3.09412 8.505 3.09094H8.48901C7.71546 3.08908 6.9728 3.39458 6.42432 3.94006C5.87583 4.48555 5.56635 5.22644 5.56396 6ZM6.66394 6C6.66484 5.88042 6.67734 5.76125 6.70105 5.64404H6.73804C7.12585 5.64434 7.49865 5.49438 7.77832 5.22571C8.05799 4.95704 8.22278 4.59051 8.23804 4.203C8.32225 4.18836 8.40757 4.18103 8.49304 4.18103C8.85095 4.18399 9.19999 4.29276 9.49622 4.49365C9.79244 4.69455 10.0226 4.97851 10.1577 5.30994C10.2929 5.64136 10.3269 6.00545 10.2556 6.3562C10.1843 6.70695 10.011 7.02873 9.7572 7.28113C9.50342 7.53352 9.18061 7.70519 8.82947 7.77454C8.47833 7.84389 8.11449 7.80786 7.78381 7.6709C7.45313 7.53394 7.17034 7.3022 6.97107 7.00488C6.7718 6.70756 6.66494 6.35792 6.66394 6Z"
                  fill="#707070"
               />
            </svg>
         </button>
      );
   };

   const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
   });

   const onGlobalFilterChange = (event) => {
      const value = event.target.value;
      let _filters = { ...filters };

      _filters["global"].value = value;

      setFilters(_filters);
   };
   const exportExcel = () => {
      import("xlsx").then((xlsx) => {
         const worksheet = xlsx.utils.json_to_sheet(record);
         const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
         const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array",
         });

         saveAsExcelFile(excelBuffer, "transactions");
      });
   };

   const saveAsExcelFile = (buffer, fileName) => {
      import("file-saver").then((module) => {
         if (module && module.default) {
            let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let EXCEL_EXTENSION = ".xlsx";
            const data = new Blob([buffer], {
               type: EXCEL_TYPE,
            });

            module.default.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
         }
      });
   };

   const [selectedMonth, setSelectedMonth] = useState("");
   const [selectedDaysFilter, setSelectedDaysFilter] = useState(7);

   const months = [{ name: "January" }, { name: "February" }, { name: "March" }, { name: "April" }];
   const daysFilter = [7, 30, 90];

   const daysOptionTemplate = (option) => {
      return <p>Last {option} days</p>;
   };

   const valueTemplate = (option) => {
      if (option) {
         return <p>Last {option} days</p>;
      }
   };

   const renderHeader = () => {
      const value = filters["global"] ? filters["global"].value : "";

      return (
         <TableHeaderStyles>
            <SearchboxStyles>
               <label htmlFor="search">
                  <svg width="15" height="15" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M21.826 20.246L18.195 16.711L18.109 16.582C17.9488 16.4249 17.7334 16.3369 17.509 16.3369C17.2847 16.3369 17.0692 16.4249 16.909 16.582C15.3989 17.947 13.4537 18.7321 11.4192 18.7976C9.38465 18.8632 7.39285 18.2049 5.79803 16.94C4.22402 15.7022 3.16757 13.9224 2.83477 11.9478C2.50198 9.97318 2.91668 7.94541 3.99801 6.26003C5.11146 4.55902 6.79462 3.31042 8.74548 2.73827C10.6963 2.16612 12.7872 2.30785 14.643 3.13802C16.4871 3.93096 17.9727 5.37791 18.814 7.20043C19.6553 9.02294 19.7928 11.0922 19.2 13.01C19.1561 13.1501 19.1507 13.2995 19.1845 13.4424C19.2183 13.5853 19.29 13.7164 19.392 13.822C19.4959 13.9293 19.6255 14.0081 19.7686 14.0508C19.9117 14.0936 20.0633 14.0988 20.209 14.066C20.3541 14.0348 20.4884 13.9659 20.5984 13.8662C20.7083 13.7664 20.7899 13.6394 20.835 13.498C21.546 11.2206 21.4017 8.762 20.4293 6.58333C19.4569 4.40466 17.7231 2.65554 15.553 1.66402C13.3683 0.629249 10.8898 0.393468 8.54916 0.99773C6.20849 1.60199 4.15388 3.00803 2.74304 4.97103C1.36847 6.91365 0.755396 9.29354 1.02032 11.6585C1.28524 14.0235 2.40969 16.2087 4.18002 17.799C5.97742 19.4194 8.28475 20.3605 10.7027 20.4595C13.1207 20.5585 15.4972 19.8091 17.421 18.341L20.636 21.471C20.7975 21.6255 21.0125 21.7118 21.236 21.7118C21.4596 21.7118 21.6745 21.6255 21.836 21.471C21.9137 21.3953 21.9757 21.305 22.0183 21.2053C22.061 21.1056 22.0835 20.9985 22.0847 20.89C22.0858 20.7816 22.0654 20.674 22.0248 20.5734C21.9842 20.4728 21.9241 20.3813 21.848 20.304L21.836 20.292L21.826 20.246Z"
                        fill="black"
                     />
                  </svg>
               </label>
               <input type="text" id="search" value={value || ""} autoComplete="off" onChange={(e) => onGlobalFilterChange(e)} placeholder="Search" />
            </SearchboxStyles>

            <div className="Theader-right">
               <div className="days-select">
                  <Dropdown value={selectedDaysFilter} onChange={(e) => setSelectedDaysFilter(e.value)} options={daysFilter} placeholder="Days" valueTemplate={valueTemplate} itemTemplate={daysOptionTemplate} className="w-full md:w-14rem" />
               </div>

               <div className="month-select">
                  <Dropdown value={selectedMonth} onChange={(e) => setSelectedMonth(e.value)} options={months} optionLabel="name" placeholder="Month" className="w-full md:w-14rem" />
               </div>

               <button onClick={exportExcel}>
                  <svg width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M10.6239 5.77698V1.177C10.6139 0.948397 10.6951 0.725169 10.8496 0.556396C11.0042 0.387624 11.2193 0.287098 11.4479 0.276978C11.6617 0.277719 11.8675 0.358542 12.0247 0.503479C12.1818 0.648416 12.2789 0.846971 12.2969 1.06L12.304 1.17499V5.77496H17.519C18.8185 5.82935 20.0473 6.38143 20.9511 7.31683C21.8548 8.25224 22.3643 9.49935 22.3739 10.8V16.83C22.4179 18.1285 21.9646 19.3949 21.1066 20.3706C20.2486 21.3463 19.0505 21.9576 17.757 22.08H5.39798C4.09897 22.0269 2.87046 21.475 1.96817 20.539C1.06588 19.603 0.559341 18.3551 0.553987 17.055V11.0359C0.509794 9.73912 0.961543 8.47424 1.81729 7.49884C2.67304 6.52344 3.86839 5.91088 5.15994 5.78595L5.38699 5.77997H10.6239V13.124L8.87796 11.224C8.80495 11.1428 8.71606 11.0774 8.61685 11.0319C8.51764 10.9864 8.41019 10.9617 8.30106 10.9592C8.19193 10.9568 8.08347 10.9767 7.98233 11.0178C7.88119 11.0588 7.78948 11.1202 7.71292 11.198L7.6879 11.224C7.54996 11.3858 7.46721 11.5872 7.45157 11.7993C7.43593 12.0113 7.48829 12.2227 7.60098 12.403L7.6879 12.518L10.8629 15.978C10.999 16.1355 11.1921 16.2325 11.3997 16.2477C11.6073 16.2629 11.8124 16.195 11.97 16.059L12.0519 15.978L15.227 12.518C15.3855 12.3401 15.4731 12.1102 15.4731 11.8719C15.4731 11.6337 15.3855 11.4038 15.227 11.226C15.0913 11.074 14.9023 10.98 14.6993 10.9634C14.4962 10.9469 14.2944 11.009 14.1359 11.137L14.0419 11.226L12.3069 13.126V5.78198L10.6239 5.77698Z"
                        fill="#7A86A1"
                     />
                  </svg>
               </button>
            </div>
         </TableHeaderStyles>
      );
   };

   const header = renderHeader();

   return (
      <Wrapper>
         <DatatableStyles>
            <DataTable
               value={record}
               size="large"
               paginator
               rows={5}
               rowsPerPageOptions={[5, 8, 10, 20]}
               selection={selectedProducts}
               onSelectionChange={(e) => setSelectedProducts(e.value)}
               rowHover
               dataKey="id"
               header={header}
               filters={filters}
               onFilter={(e) => setFilters(e.filters)}
               // tableStyle={{ minWidth: "900px" }}
            >
               <Column selectionMode="multiple" exportable={false} headerStyle={{ width: "1rem" }}></Column>
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", color: "#7A86A1" }} field="withdraw" header="Withdraw" body={withdrawBodyTemplate} />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", color: "#7A86A1" }} field="date" header="Date" />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", textAlign: "center", color: "#7A86A1", maxWidth: "80px" }} field="commission" header="Commission Amount" />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", textAlign: "center", color: "#7A86A1", maxWidth: "80px" }} field="admissionAmount" header="Admission Amount" body={AdmissionAmountTemplate} />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", color: "#7A86A1" }} field="" header="Invoice" body={invoiceTemplate} />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", color: "#7A86A1" }} field="status" header="Status" body={statusTemplate} />
               <Column style={{ fontWeight: 400, fontSize: "14px", lineHeight: "19px", color: "#7A86A1" }} body={viewTemplate} />
            </DataTable>
         </DatatableStyles>
      </Wrapper>
   );
};

export default TransactionHistoryTable;
