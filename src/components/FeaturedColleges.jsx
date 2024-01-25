import { useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import styled from "styled-components";
import FeaturedCollege from "./FeaturedCollege";

const Wrapper = styled.div`
  padding: 34px 28px;
  border-radius: 20px;
  border: 1px solid #707070;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 35px;

    h5 {
      font-weight: 400;
      font-size: 22px;
      line-height: 29px;
      color: #000000;
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

  .discover-colleges {
    border-radius: 30px;
    background-image: url("/discover-colleges-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 72px 50px;

    h4 {
      font-weight: 400;
      font-size: 22px;
      line-height: 29px;
      color: #ffffff;
      padding-bottom: 8px;
    }
    p {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #f6efff;
    }

    .discover-clg-cta {
      padding-top: 35px;
      button {
        background: #ffffff;
        padding: 16px 38px;
        border-radius: 20px;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #60269e;
        transition: all 0.15s ease-in-out;
        outline: none;

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 24px 18px;

    .header {
      padding-bottom: 20px;
    }

    .discover-colleges {
      padding: 42px 30px;
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 24px 18px;

    .header {
      padding-bottom: 20px;
    }

    .discover-colleges {
      padding: 42px 30px;
    }
  }
`;

const Colleges = [
  {
    image: "/featuredCol-1.png",
    name: "Narayana jr college",
    owner: "Narayanguda",
    type: "private",
    status: "onboard",
    link: "/",
  },
  {
    image: "/featuredCol-1.png",
    name: "Nanda jr college",
    owner: "Kompally",
    type: "government",
    status: "pending",
    link: "/",
  },
  {
    image: "/featuredCol-1.png",
    name: "Nalanda jr college",
    owner: "Jubilee hills",
    type: "nonprofit",
    status: "onboard",
    link: "/",
  },
];

const FeaturedColleges = ({ countData }) => {
  const navigate = useNavigate();
  console.log("countData", countData);
  return (
    <Wrapper>
      <div className="header">
        <div className="header-left">
          <h5>Featured College</h5>
        </div>
        <div className="header-right">
          <div className="options">
            {/* <button>
                     <FiMoreHorizontal />
                  </button> */}
          </div>
        </div>
      </div>

      <div className="featured-colleges">
        <ul>
          {countData?.featuredCollege.map((college, index) => {
            return (
              <FeaturedCollege
                key={index}
               //  image={college.collegeName}
                name={college.collegeName}
                //  link={college.link}
                //  owner={college.owner}
                type={college.collegeType}
                status={college.status}
              />
            );
          })}
        </ul>
      </div>

      <div className="discover-colleges">
        <h4>Discover all Colleges</h4>
        <p>Explore with Scolage</p>
        <div className="discover-clg-cta">
          <button onClick={() => navigate("/colleges")}>
            Show all Colleges
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default FeaturedColleges;
