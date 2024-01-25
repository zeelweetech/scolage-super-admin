import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.li`
  padding-bottom: 40px;
  a {
    .featured-col {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ft-col-left {
        display: flex;
        align-items: center;
        gap: 20px;

        .col-profile {
          height: 70px;
          width: 70px;
          border-radius: 30px;
          overflow: hidden;
        }

        .col-name {
          h2 {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
            padding-bottom: 7px;
          }
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #7a86a1;
          }
        }
      }

      .ft-col-right {
        display: flex;
        align-items: center;
        gap: 46px;

        .col-type {
          background: #f6efff;
          padding: 10px 30px 10px 12px;
          border-radius: 16px;
          min-width: 127px;

          p {
            padding-left: 18px;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #60269e;
            text-transform: capitalize;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-48%);
              width: 8px;
              height: 8px;
              border-radius: 10px;
              background: #60269e;
            }
          }

          &.government {
            background: #fff8eb;
            p {
              color: #f9b035;
              &::before {
                background: #f9b035;
              }
            }
          }
          &.nonprofit {
            background: #ffebf6;
            p {
              color: #fe76c2;
              &::before {
                background: #fe76c2;
              }
            }
          }
        }

        .col-status {
          p {
            font-weight: 400;
            font-size: 15px;
            line-height: 20px;
            color: #7a86a1;
            text-transform: capitalize;
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding-bottom: 20px;
    a {
      .featured-col {
        .ft-col-left {
          .col-profile {
            height: 50px;
            width: 50px;
            border-radius: 20px;
            overflow: hidden;
          }
        }
        .ft-col-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }
      }
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    padding-bottom: 20px;
    a {
      .featured-col {
        .ft-col-left {
          .col-profile {
            height: 50px;
            width: 50px;
            border-radius: 20px;
            overflow: hidden;
          }
        }
        .ft-col-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }
      }
    }
  }
`;

const FeaturedCollege = ({ image, name, owner, type, status, link }) => {
  return (
    <Wrapper>
      <Link to={"/"}>
        <div className="featured-col">
          <div className="ft-col-left">
            <div className="col-profile">
              <img src="/featuredCol-1.png" alt="" />
            </div>
            <div className="col-name">
              <h2>{name}</h2>
              <p>{owner}</p>
            </div>
          </div>

          <div className="ft-col-right">
            <div className={`col-type ${type}`}>
              <p>{type}</p>
            </div>

            <div className="col-status">
              <p>onboard</p>
            </div>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default FeaturedCollege;
