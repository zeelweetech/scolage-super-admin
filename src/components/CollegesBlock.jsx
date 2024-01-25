import styled from "styled-components";
import CollegesChart from "./CollegesChart";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Wrapper = styled.div`
  padding: 28px 32px 40px;
  border-radius: 20px;
  border: 1px solid #707070;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 34px;

    .left {
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
        background: #f6efff;
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

    .right {
      button {
        padding: 10px 27px;
        border-radius: 16px;
        cursor: pointer;
        color: #7a86a1;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        &.active {
          background: #60269e;
          color: #fff;
        }
      }
    }
  }

  .chart-main {
    .apexcharts-toolbar {
      display: none;
    }

    .apexcharts-legend {
      justify-content: flex-end !important;
      gap: 10px;
    }

    .apexcharts-legend-marker {
      height: 17px !important;
      width: 17px !important;
      border-radius: 7px !important;
    }

    .apexcharts-legend-text {
      padding-left: 20px;
      font-weight: 400;
      font-size: 14px !important;
      line-height: 19px !important;
      color: #7a86a1 !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 18px 22px 20px;
    .header {
      padding-bottom: 10px;
      .left {
        gap: 16px;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 18px 22px 20px;
    .header {
      padding-bottom: 10px;
      .left {
        gap: 16px;
      }
      .right {
        button {
          padding: 7px 10px;
          border-radius: 12px;
        }
      }
    }
  }
`;

const CollegesBlock = ({ countData }) => {
  const [activeData, setActiveData] = useState(true);
  const [lastActiveData, setLastActiveData] = useState(false);

  return (
    <Wrapper>
      <div className="header">
        <div className="left">
          <h5>Colleges</h5>
          <div className="progress-per-block">
            <div className="progress-icon">
              <img src={"/arrow-up.png"} alt="" />
            </div>
            <p>+0,8%</p>
          </div>
        </div>

        <div className="right">
          <div className="toggle-chart-tabs">
            <button
              className={activeData ? "active" : "inactive"}
              onClick={() => {
                setActiveData(true), setLastActiveData(false);
              }}
            >
              This Week
            </button>
            <button
              className={lastActiveData ? "active" : "inactive"}
              onClick={() => {
                setLastActiveData(true), setActiveData(false);
              }}
            >
              Last Week
            </button>
          </div>
        </div>
      </div>

      <div className="chart-main">
        <CollegesChart activeData={activeData} countData={countData} />
      </div>
    </Wrapper>
  );
};

export default CollegesBlock;
