import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.div`
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #707070;
  background: #fce8f3;
  height: 100%;

  .header {
    padding-bottom: 38px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 26px;

      h5 {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
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

    .header-bottom {
      .date-main {
        display: flex;
        align-items: center;
        gap: 10px;

        .icon {
          width: 15px;
        }

        p {
          font-weight: 400;
          font-size: 13px;
          line-height: 17px;
          color: #7a86a1;
        }
      }
    }
  }

  .total-col-admissions {
    h5 {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #7a86a1;
      padding-bottom: 4px;
    }

    .admissions-counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;

      h4 {
        font-weight: 400;
        font-size: 48px;
        line-height: 64px;
        color: #fe76c2;
      }

      .admissions-per {
        background: #fe76c2;
        border-radius: 10px;
        padding: 4px 12px;
        font-weight: 400;
        font-size: 13px;
        line-height: 17px;
        color: #ffffff;
      }
    }
  }

  .all-data-cta {
    a {
      p {
        display: flex;
        align-items: center;
        gap: 18px;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 20px;
  }
`;

const ApplicationData = () => {
  const [admissionCount, setAdmissionCount] = useState(0);

  const getDataCount = async () => {
    try {
      const { data } = await axios.get("/v2/admissionlist/get", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setAdmissionCount(data.admission.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataCount();
  }, []);

  return (
    <Wrapper>
      <div className="header">
        <div className="header-left">
          <h5>Application Data</h5>
          <div className="progress-per-block">
            <div className="progress-icon">
              <img src={"/arrow-up.png"} alt="" />
            </div>
            <p>+0,7%</p>
          </div>
        </div>
        <div className="header-bottom">
          <div className="date-main">
            <div className="icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.57304 15.9941C5.83767 15.994 4.15602 15.3921 2.81471 14.291C1.4734 13.1899 0.555425 11.6578 0.217236 9.95567C-0.120954 8.25357 0.141564 6.48687 0.960064 4.95665C1.77856 3.42643 3.10239 2.22744 4.70591 1.56395C6.30944 0.900451 8.09344 0.813588 9.75386 1.3181C11.4143 1.82261 12.8483 2.88724 13.8117 4.33067C14.775 5.7741 15.208 7.50696 15.0369 9.23387C14.8657 10.9608 14.101 12.5749 12.873 13.8011C11.4667 15.2055 9.56049 15.9942 7.57304 15.9941ZM7.31105 4.69407C7.16208 4.69434 7.01929 4.75365 6.91395 4.85899C6.80861 4.96433 6.7493 5.10712 6.74903 5.25609V9.04112C6.74969 9.13826 6.77558 9.23359 6.82414 9.31773C6.87269 9.40187 6.94226 9.47192 7.02604 9.5211L9.96504 11.2751C10.0531 11.3285 10.154 11.3572 10.257 11.3581C10.3543 11.3576 10.4498 11.3316 10.5339 11.2828C10.6181 11.2341 10.6881 11.1642 10.737 11.0801C10.8123 10.951 10.8336 10.7976 10.7961 10.6529C10.7586 10.5083 10.6655 10.3843 10.537 10.3081L7.86805 8.7191V5.25609C7.86622 5.1085 7.8065 4.96762 7.70176 4.86363C7.59702 4.75964 7.45562 4.70083 7.30803 4.70006L7.31105 4.69407Z"
                  fill="#707070"
                />
              </svg>
            </div>
            <p>10:38 - 21 Jun 2021</p>
          </div>
        </div>
      </div>

      <div className="total-col-admissions">
        <h5>Total College Admissions</h5>

        <div className="admissions-counter">
          <h4>{admissionCount}</h4>
          <div className="admissions-per">+34% this Week</div>
        </div>
      </div>

      <div className="all-data-cta">
        <Link to={"/dashboard"}>
          <p>
            Complete Data{" "}
            <span>
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.32403 11.7931C9.20799 11.6815 9.13764 11.5307 9.12673 11.37C9.11583 11.2094 9.16515 11.0504 9.26504 10.9241L9.32403 10.8561L13.653 6.6691H1.68002C1.50762 6.67575 1.33947 6.61484 1.21145 6.49918C1.08343 6.38352 1.0057 6.22239 0.994866 6.0502C0.984032 5.87802 1.04096 5.70834 1.15347 5.57755C1.26597 5.44676 1.42514 5.36515 1.59701 5.35013H1.68002H15.3C15.4334 5.34922 15.5641 5.38753 15.6759 5.46024C15.7877 5.53295 15.8757 5.63691 15.929 5.75919C15.9738 5.86567 15.9893 5.98223 15.9738 6.09671C15.9583 6.21119 15.9125 6.31942 15.841 6.41019L15.78 6.47611L10.285 11.7962C10.1565 11.9179 9.98661 11.9863 9.80959 11.9878C9.63258 11.9893 9.46158 11.9237 9.33102 11.8041L9.32201 11.7962L9.32403 11.7931ZM12.424 4.15018L12.356 4.09317L9.32201 1.15714C9.25898 1.09658 9.20884 1.02394 9.17458 0.943515C9.14033 0.863095 9.12267 0.776534 9.12267 0.689121C9.12267 0.601708 9.14033 0.515269 9.17458 0.434848C9.20884 0.354428 9.25898 0.281665 9.32201 0.221103C9.44044 0.107741 9.59492 0.039624 9.75848 0.0284764C9.92204 0.0173287 10.0843 0.063945 10.217 0.16019L10.288 0.220127L13.318 3.15311C13.381 3.21383 13.431 3.28661 13.4652 3.3671C13.4994 3.44759 13.517 3.53416 13.517 3.62162C13.517 3.70907 13.4994 3.79564 13.4652 3.87613C13.431 3.95663 13.381 4.0294 13.318 4.09012C13.1997 4.20297 13.0457 4.27087 12.8826 4.28202C12.7194 4.29316 12.5576 4.24687 12.425 4.15116L12.424 4.15018Z"
                  fill="black"
                />
              </svg>
            </span>
          </p>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ApplicationData;
