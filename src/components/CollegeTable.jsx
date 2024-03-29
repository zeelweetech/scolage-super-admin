import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CollegeList from "../../helper/CollegeList";
import { useState } from "react";
import { Rating } from "primereact/rating";
import { FilterMatchMode } from "primereact/api";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingBar } from "../context/LoadingBarContext";
import toast from "react-hot-toast";
import { Calendar } from "primereact/calendar";

const DatatableStyles = styled.div`
  padding: 0 26px 26px;
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

  tr td:nth-child(4),
  tr td:nth-child(7),
  tr td:nth-child(5) {
    font-weight: bold !important;
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
  /* fontWeight: 400, fontSize: "19px", lineHeight: "25px", color: "#707070"  */
  .tableText {
    font-weight: 400 !important;
    font-size: 19px;
    line-height: 25px;
    color: #707070 !important;
  }

  .p-datatable.p-datatable-lg .p-datatable-thead > tr > th.text-center,
  .p-datatable .p-datatable-tbody > tr > td.text-center {
    text-align: center !important;
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    .p-datatable.p-datatable-lg .p-datatable-header {
      padding: 10px;
    }
    .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
      padding: 10px;
    }
    .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
      padding: 10px;
    }

    .p-checkbox .p-checkbox-box {
      width: 20px;
      height: 20px;
    }

    .tableText {
      font-size: 15px;
      line-height: 20px;
    }

    .payment-status {
      padding: 3px 20px 4px;
      font-size: 14px;
      line-height: 23px;
    }

    .onboard-status {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const SearchboxStyles = styled.div`
  /* margin: 0 52px 48px; */
  max-width: 500px;
  width: 500px;
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

  @media (min-width: 768px) and (max-width: 1024px) {
    input {
      padding: 9px 10px 9px 45px;
      border-radius: 14px;
    }

    label {
      left: 16px;
      svg {
        width: 18px;
      }
    }
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

    button {
      width: 66px;
      height: 66px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 1px solid #707070;
      border-radius: 20px;
      filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));

      &:last-child {
        filter: none;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .Theader-right {
      gap: 14px;
      button {
        width: 44px;
        height: 44px;
        border-radius: 14px;

        svg {
          width: 16px;
        }
      }
    }
  }
`;

const CollegeTable = () => {
  const { setProgressBar } = useLoadingBar();
  const [record, setRecord] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [date, setDate] = useState(null);
  const [formatedDate, setFormatedDate] = useState();
  const navigate = useNavigate();

  const getCollegeList = async () => {
    setProgressBar(0);
    try {
      setProgressBar(40);
      const { data } = await axios.get(
        date
          ? `/v2/collegelist/get?filter=${formatedDate}`
          : `/v2/collegelist/get`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(
        "data",
        data?.college?.filter((item) => {
          return item?.createdAt;
        })
      );
      setProgressBar(50);
      setRecord(data.college);
      setProgressBar(100);
    } catch (err) {
      setProgressBar(0);
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  console.log("formatedDate", formatedDate);
  useEffect(() => {
    getCollegeList();
  }, [formatedDate ? formatedDate : ""]);

  const ratingBodyTemplate = (record) => {
    console.log("record", record);
    return <Rating value={record?.review} stars={5} readOnly cancel={false} />;
  };
  const paymentStatus = (record) => {
    return (
      <p className={`payment-status ${getPStatus(record)}`}>
        {record.pStatus ? record.pStatus : "-"}
      </p>
    );
  };

  const getPStatus = (record) => {
    switch (record.pStatus) {
      case "paid":
        return "paid";

      case "pending":
        return "pending";

      default:
        return null;
    }
  };

  const onboardStatus = (record) => {
    return (
      <p className={`onboard-status ${getOStatus(record)}`}>
        {record.oStatus ? record.oStatus : "-"}
      </p>
    );
  };

  const onCollegeType = (record) => {
    return (
      <p className={`onboard-status ${getOStatus(record)}`}>
        {record.cType ? record.cType : "-"}
      </p>
    );
  };

  const getOStatus = (record) => {
    switch (record.oStatus) {
      case "applied":
        return "applied";

      case "pending":
        return "pending";

      default:
        return null;
    }
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

  const onGlobalMonthDateChange = (event) => {
    const dateString = event.target.value;
    const dateObj = new Date(dateString);
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const formattedDate = `${monthNames[monthIndex]}-${year}`;
    setFormatedDate(formattedDate);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(record);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "college_list");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <TableHeaderStyles>
        <SearchboxStyles>
          <label htmlFor="search">
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.826 20.246L18.195 16.711L18.109 16.582C17.9488 16.4249 17.7334 16.3369 17.509 16.3369C17.2847 16.3369 17.0692 16.4249 16.909 16.582C15.3989 17.947 13.4537 18.7321 11.4192 18.7976C9.38465 18.8632 7.39285 18.2049 5.79803 16.94C4.22402 15.7022 3.16757 13.9224 2.83477 11.9478C2.50198 9.97318 2.91668 7.94541 3.99801 6.26003C5.11146 4.55902 6.79462 3.31042 8.74548 2.73827C10.6963 2.16612 12.7872 2.30785 14.643 3.13802C16.4871 3.93096 17.9727 5.37791 18.814 7.20043C19.6553 9.02294 19.7928 11.0922 19.2 13.01C19.1561 13.1501 19.1507 13.2995 19.1845 13.4424C19.2183 13.5853 19.29 13.7164 19.392 13.822C19.4959 13.9293 19.6255 14.0081 19.7686 14.0508C19.9117 14.0936 20.0633 14.0988 20.209 14.066C20.3541 14.0348 20.4884 13.9659 20.5984 13.8662C20.7083 13.7664 20.7899 13.6394 20.835 13.498C21.546 11.2206 21.4017 8.762 20.4293 6.58333C19.4569 4.40466 17.7231 2.65554 15.553 1.66402C13.3683 0.629249 10.8898 0.393468 8.54916 0.99773C6.20849 1.60199 4.15388 3.00803 2.74304 4.97103C1.36847 6.91365 0.755396 9.29354 1.02032 11.6585C1.28524 14.0235 2.40969 16.2087 4.18002 17.799C5.97742 19.4194 8.28475 20.3605 10.7027 20.4595C13.1207 20.5585 15.4972 19.8091 17.421 18.341L20.636 21.471C20.7975 21.6255 21.0125 21.7118 21.236 21.7118C21.4596 21.7118 21.6745 21.6255 21.836 21.471C21.9137 21.3953 21.9757 21.305 22.0183 21.2053C22.061 21.1056 22.0835 20.9985 22.0847 20.89C22.0858 20.7816 22.0654 20.674 22.0248 20.5734C21.9842 20.4728 21.9241 20.3813 21.848 20.304L21.836 20.292L21.826 20.246Z"
                fill="black"
              />
            </svg>
          </label>
          <input
            type="text"
            id="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Search"
          />
        </SearchboxStyles>
        <div className="flex-auto">
          <Calendar
            value={date}
            onChange={(e) => {
              console.log(e.target.value, "ooo");
              onGlobalMonthDateChange(e);
              setDate(e.target.value);
              disable;
            }}
            placeholder="Select month"
            view="month"
            dateFormat="MM yy"
          />
        </div>

        <div className="Theader-right">
          <button>
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.27794 25.4771C5.34731 25.4738 4.4548 25.1068 3.79125 24.4542C3.1277 23.8017 2.74571 22.9155 2.72692 21.985C2.34792 18.468 1.71389 10.1551 1.70189 10.0701C1.68895 9.81928 1.77194 9.57293 1.93395 9.38104C2.01333 9.29144 2.11074 9.21964 2.21984 9.17035C2.32893 9.12106 2.44729 9.09544 2.567 9.09509H19.3669C19.4867 9.09711 19.6047 9.12379 19.7136 9.17352C19.8225 9.22325 19.92 9.29496 20 9.38409C20.0805 9.47856 20.1413 9.58816 20.1789 9.70648C20.2166 9.8248 20.2302 9.94942 20.219 10.0731C20.219 10.1571 19.5729 18.4841 19.2049 21.9871C19.1858 22.9317 18.7924 23.8301 18.1112 24.4849C17.43 25.1397 16.5166 25.4973 15.5719 25.4791C14.0079 25.5111 12.472 25.524 10.963 25.524C9.365 25.525 7.79794 25.5131 6.27794 25.4771ZM0.92699 7.10809C0.692682 7.10052 0.47074 7.00119 0.308948 6.83154C0.147155 6.66189 0.058468 6.43545 0.0619994 6.20105V5.73108C0.0566302 5.49615 0.144696 5.26868 0.306872 5.09863C0.469049 4.92858 0.692074 4.82986 0.92699 4.8241H4.458C4.8135 4.81732 5.15602 4.68924 5.42882 4.46118C5.70162 4.23312 5.88831 3.91874 5.958 3.57007L6.14196 2.72705C6.25745 2.19494 6.54893 1.7173 6.96935 1.37128C7.38976 1.02525 7.91458 0.83107 8.45897 0.820068H13.459C13.9933 0.831212 14.5088 1.0191 14.9249 1.35437C15.3411 1.68964 15.6343 2.15342 15.7589 2.6731L15.959 3.57306C16.0281 3.92208 16.2146 4.23695 16.4875 4.46527C16.7604 4.69359 17.1032 4.8216 17.459 4.82806H20.991C21.2252 4.83279 21.4479 4.93017 21.6105 5.09888C21.773 5.26758 21.8619 5.49387 21.8579 5.72809V6.19806C21.8614 6.43213 21.773 6.65829 21.6117 6.82788C21.4503 6.99747 21.2289 7.09695 20.995 7.10504L0.92699 7.10809Z"
                fill="#60269E"
              />
            </svg>
          </button>
          <button onClick={""}>
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-0.000976562 17.9171V22.5011H4.58202L18.099 8.98306L13.516 4.40106L-0.000976562 17.9171ZM21.643 5.43906C21.7563 5.32602 21.8462 5.19174 21.9075 5.04391C21.9689 4.89608 22.0004 4.73761 22.0004 4.57756C22.0004 4.41752 21.9689 4.25904 21.9075 4.11121C21.8462 3.96338 21.7563 3.8291 21.643 3.71606L18.783 0.856061C18.67 0.742766 18.5357 0.652882 18.3879 0.591554C18.24 0.530225 18.0816 0.498657 17.9215 0.498657C17.7615 0.498657 17.603 0.530225 17.4552 0.591554C17.3073 0.652882 17.1731 0.742766 17.06 0.856061L14.824 3.09306L19.407 7.67606L21.644 5.43906H21.643Z"
                fill="#60269E"
              />
            </svg>
          </button>
          <button onClick={exportExcel}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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

  const cityBodyTemplate = (record) => {
    const city = record.address.split(", ")[1];
    return city;
  };

  const header = renderHeader();

  const handleRowClick = (event) => {
    console.log(event.data.collegeid);
    navigate(`/college/${event.data.collegeid}`);
  };

  return (
    <DatatableStyles>
      <DataTable
        value={record}
        size="large"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 8, 10, 20, 50]}
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        rowHover
        dataKey="collegeid"
        onRowClick={handleRowClick}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column
          selectionMode="multiple"
          exportable={false}
          className="tableText"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          className="tableText"
          field="collegename"
          header="College's"
        ></Column>
        <Column
          className="tableText text-center"
          field="address"
          header="City"
          body={cityBodyTemplate}
        ></Column>
        <Column
          className="tableText text-center"
          field="total_admission"
          header="Total Admission"
        ></Column>
        <Column
          className="tableText text-center"
          field="applied_admission"
          header="Applied Admission"
        ></Column>
        <Column
          className="tableText text-center"
          field="oStatus"
          header="Onboard Status"
          body={onboardStatus}
        ></Column>
        <Column
          className="tableText text-center"
          style={{ minWidth: "150px" }}
          field="cType"
          header="College Type 10+2 or 12+3"
          body={onCollegeType}
        ></Column>
        <Column
          className="tableText text-center"
          field="rStatus"
          header="Review Status"
          body={ratingBodyTemplate}
        ></Column>
        <Column
          className="tableText text-center"
          field="pStatus"
          header="Payment Status"
          body={paymentStatus}
        ></Column>
      </DataTable>
    </DatatableStyles>
  );
};

export default CollegeTable;
