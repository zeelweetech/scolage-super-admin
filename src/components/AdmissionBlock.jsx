import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import AdmissionChart from "./AdmissionChart";
import { useState } from "react";

const Wrapper = styled.div`
  padding: 40px 30px;
  border-radius: 20px;
  border: 1px solid #707070;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 26px;

      h5 {
        font-weight: 400;
        font-size: 22px;
        line-height: 29px;
        color: #000000;
      }

      .progress-per-block {
        background: #ffd600;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 14px;

        .progress-icon {
          width: 15px;
        }

        p {
          font-weight: 400;
          font-size: 13px;
          line-height: 17px;
          color: #60269e;
        }
      }
    }

    .header-right {
      .options {
        button {
          height: 18px;
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            width: 100%;

            path {
              fill: #707070;
            }
          }
        }
      }
    }
  }

  .toggle-chart {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 30px;

    select {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #7a86a1;
      outline: none;
    }
  }

  .admission-chart {
    .apexcharts-toolbar {
      display: none;
    }
  }

  .growth-status {
    padding: 10px 23px;
    border-radius: 16px;
    background: #f6efff;
    display: flex;
    gap: 15px;
    align-items: center;

    .icon {
      width: 20px;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #60269e;
      span {
        color: #7a86a1;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 20px 10px;
  }
`;

const AdmissionBlock = ({ countData }) => {
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  console.log("selectedOption", selectedOption);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Wrapper>
      <div className="header">
        <div className="header-left">
          <h5>Admission</h5>
          <div className="progress-per-block">
            <div className="progress-icon">
              <img src={"/arrow-up.png"} alt="" />
            </div>
            <p>+0,7%</p>
          </div>
        </div>

        <div className="header-right">
          <div className="options">
            <button>
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
      </div>

      <div className="toggle-chart">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
        </select>
      </div>

      <div className="admission-chart">
        <AdmissionChart selectedOption={selectedOption} countData={countData} />
      </div>

      <div className="growth-status">
        <div className="icon">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99997 20C7.6865 19.9996 5.44475 19.1971 3.65665 17.7291C1.86855 16.2612 0.64475 14.2187 0.193726 11.9496C-0.257298 9.68051 0.0923749 7.32521 1.18317 5.28504C2.27396 3.24486 4.03837 1.646 6.17581 0.760865C8.31326 -0.124272 10.6915 -0.240919 12.9053 0.430787C15.1191 1.10249 17.0315 2.52095 18.3167 4.44458C19.602 6.36821 20.1805 8.67802 19.9537 10.9803C19.7269 13.2827 18.7088 15.4352 17.073 17.071C16.1442 17.9999 15.0415 18.7366 13.8279 19.2391C12.6142 19.7417 11.3135 20.0002 9.99997 20ZM9.99997 12.932C9.76865 12.9335 9.54735 13.0266 9.38455 13.1909C9.22176 13.3553 9.13074 13.5774 9.13147 13.8087C9.1322 14.04 9.2246 14.2616 9.38843 14.4249C9.55225 14.5882 9.77414 14.6799 10.0055 14.6799C10.2368 14.6799 10.4587 14.5882 10.6225 14.4249C10.7863 14.2616 10.8787 14.04 10.8795 13.8087C10.8802 13.5774 10.7892 13.3553 10.6264 13.1909C10.4636 13.0266 10.2423 12.9335 10.011 12.932H9.99997ZM9.99997 5.33203C9.76754 5.33514 9.54553 5.42878 9.38116 5.59314C9.2168 5.7575 9.12307 5.97961 9.11996 6.21204V10.632C9.11996 10.8642 9.21222 11.0869 9.3764 11.2511C9.54059 11.4153 9.76329 11.5074 9.99548 11.5074C10.2277 11.5074 10.4503 11.4153 10.6145 11.2511C10.7787 11.0869 10.871 10.8642 10.871 10.632V6.21106C10.872 5.9789 10.7809 5.7557 10.6176 5.5907C10.4543 5.4257 10.2321 5.33335 9.99997 5.33203Z"
              fill="#60269E"
            />
          </svg>
        </div>
        <div className="percentage">
          <p>
            {countData?.admissionGrowthPercentage}%{" "}
            <span>Growth this month</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdmissionBlock;
