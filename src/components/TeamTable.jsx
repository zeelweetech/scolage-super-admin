import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TeamList from "../../helper/TeamList";
import { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import CryptoJS from "crypto-js";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import styled from "styled-components";
import OptionIcon from "../Icons/OptionIcon";
import toast from "react-hot-toast";
import { ProgressSpinner } from "primereact/progressspinner";

const DatatableStyles = styled.div`
   /* padding: 0 26px 26px; */

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

   .p-datatable .p-datatable-loading-overlay {
      background: rgb(255 255 255 / 0.8);
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

      .filter-select {
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
   }
`;

const TeamTable = ({ record, setRecord, loading }) => {
   // const [record, setRecord] = useState(TeamList);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [selectedFilterOpt, setSelectedFilterOpt] = useState({ name: "Oldest" });

   const FilterOption = [{ name: "Oldest" }, { name: "Newest" }];

   const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      'full_name': { value: null, matchMode: FilterMatchMode.CONTAINS },
   });

   const filterChange = () => {
      switch (selectedFilterOpt.name) {
         case "Oldest":
            setRecord(record?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
            break;
         case "Newest":
            setRecord(record?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            break;
      }
   };

   useEffect(() => {
      filterChange();
   },[selectedFilterOpt])

   const onGlobalFilterChange = (event) => {
      const value = event.target.value;
      let _filters = { ...filters };

      _filters["global"].value = value;

      setFilters(_filters);
   };

   const OptTemplateStyle = styled.button`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 18px;
      width: 18px;
      outline: none;
   `;

   const optTemplate = (record) => {
      return (
         <OptTemplateStyle>
            <OptionIcon />
         </OptTemplateStyle>
      );
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
               <div className="filter-select">
                  <Dropdown value={selectedFilterOpt} onChange={(e) => setSelectedFilterOpt(e.value)} defaultValue={FilterOption[0]} options={FilterOption} optionLabel="name" placeholder="Filter" className="w-full md:w-14rem" />
               </div>
            </div>
         </TableHeaderStyles>
      );
   };

   const header = renderHeader();

   const decrypt = (ciphertext) => {
      const passphrase = import.meta.env.VITE_PASSPHRASE;
      const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
   };

   const passwordBodyTemplate = (record) => {
      return <> {record.encryppass ? <p>{decrypt(record.encryppass)}</p> : <p className="text-red-500">Password not found !!</p>}</>;
   };

   return (
      <DatatableStyles>
         <DataTable value={record} size="large" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} rowHover dataKey="_id" header={header} filters={filters} loading={loading} loadingIcon={<ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="rgb(0 0 0 / 0)" animationDuration="1s" />} onFilter={(e) => setFilters(e.filters)} tableStyle={{ minWidth: "40rem" }}>
            <Column selectionMode="multiple" exportable={false} headerStyle={{ width: "3rem" }}></Column>
            <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#010101" }} field="name" header="Name"></Column>
            <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#7A86A1" }} headerStyle={{ color: "#010101" }} field="employeeId" header="Employee ID"></Column>
            {/* <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#7A86A1" }} headerStyle={{ color: "#010101" }} field="userId" header="User ID"></Column> */}
            <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#7A86A1" }} headerStyle={{ color: "#010101" }} field="email" header="Email"></Column>
            {/* <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#7A86A1" }} headerStyle={{ color: "#010101" }} field="password" header="Password" body={passwordBodyTemplate}></Column> */}
            <Column style={{ fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#7A86A1" }} headerStyle={{ color: "#010101" }} field="role" header="Role"></Column>
            <Column body={optTemplate} />
         </DataTable>
      </DatatableStyles>
   );
};

export default TeamTable;
