import { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import StudentDetail from "./StudentDetail";
import { Rating } from "primereact/rating";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 20px;

  .student-info-left {
    flex: 2;
    border: 1px solid #707070;
    border-radius: 30px;
    padding: 70px 0 20px;

    .student-header {
      background: #60269e;
      padding: 30px 54px 36px;
      width: 100%;
      display: flex;
      align-items: center;

      .student-avatar {
        width: 164px;
        aspect-ratio: 1 / 1;
        position: relative;

        .student-avatar-in {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: 0;
          right: 12px;

          button {
            background: #ffffff;
            padding: 15px;
            border-radius: 20px;
            filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.18));
          }
        }
      }

      .student-header-info {
        display: flex;
        align-items: start;
        width: calc(100% - 164px);
        padding-left: 60px;
        justify-content: space-between;
        gap: 20px;

        .student-name {
          h4 {
            font-weight: 700;
            font-size: 40px;
            line-height: 53px;
            color: #ffffff;
            padding-bottom: 4px;
          }
          p {
            max-width: 300px;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #ffffff;
          }
        }

        .admission-form-cta {
          button {
            background: #fff;
            padding: 20px 38px 18px;
            border-radius: 20px;
            font-weight: 400;
            font-size: 18px;
            line-height: 24px;
            color: #7a86a1;
          }
        }
      }
    }

    .student-details-main {
      padding: 32px 54px;
      .title {
        h2 {
          font-weight: 700;
          font-size: 30px;
          line-height: 40px;
          color: #60269e;
        }
        padding-bottom: 50px;
      }

      .student-details-in {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 48px;
      }
    }
  }
  .student-info-right {
    flex: 1;
    max-width: 506px;
    border: 1px solid #707070;
    border-radius: 30px;
    padding: 90px 50px;

    .applied-clg-main {
      .Aclg-title {
        background: #60269e;
        border: 1px solid #707070;
        padding: 16px;
        border-radius: 20px;
        h4 {
          text-align: center;
          font-weight: 400;
          font-size: 24px;
          line-height: 32px;
          color: #ffffff;
        }
      }

      .Aclg-list {
        padding: 16px 0 160px;
        border-bottom: 1px solid #707070;

        li {
          padding-left: 18px;
          position: relative;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #000000;
          margin-bottom: 20px;

          &:last-child {
            margin: 0;
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 11px;
            width: 11px;
            background: #1dd636;
            border-radius: 100px;
          }
        }
      }
    }

    .Sclg-list-main {
      ul {
        padding-top: 48px;
        li {
          max-width: 360px;
          padding-bottom: 32px;

          &:last-child {
            padding: 0px;
          }

          h4 {
            font-weight: 400;
            font-size: 18px;
            line-height: 24px;
            color: #000000;
            padding-bottom: 5px;
          }
          .p-rating .p-rating-item .p-rating-icon {
            color: #707070;
          }
          .p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
            color: #fdd400 !important;
          }
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
            padding-top: 12px;
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    flex-direction: column;

    .student-info-left {
      width: 100%;
      flex: 1;

      .student-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 22px;
        .student-header-info {
          flex-direction: column;
          padding: 0;
          .student-name {
            h4 {
              font-size: 33px;
            }
            p {
              max-width: 100%;
            }
          }
          .admission-form-cta button {
            padding: 16px 34px 14px;
          }
        }
      }

      .student-details-main {
        padding: 22px 36px;
        .title {
          padding-bottom: 30px;
        }
        .student-details-in {
          grid-template-columns: repeat(1, 1fr);
          gap: 26px;
        }
      }
    }

    .student-info-right {
      max-width: 100%;
    }
  }

  @media (min-width: 1281px) and (max-width: 1600px) {
    .student-info-left {
      width: calc(100% - 500px);
      .student-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 22px;
        .student-header-info {
          flex-direction: column;
          padding: 0;
          .admission-form-cta button {
            padding: 16px 34px 14px;
          }
        }
      }

      .student-details-main {
        padding: 22px 36px;
        .title {
          padding-bottom: 30px;
        }
        .student-details-in {
          grid-template-columns: repeat(1, 1fr);
          gap: 26px;
        }
      }
      /* .student-header {
            padding: 20px 34px 26px;
            .student-header-info {
               padding-left: 20px;
            }
         }
         .student-details-main {
            padding: 26px 38px;
         } */
    }
    .student-info-right {
      width: 500px;
      flex: 1;
      padding: 50px 30px;
    }
  }
`;

const StudentProf = () => {
  let { id } = useParams();
  const [student, setStudent] = useState(null);
  const [appliedData, setAppliedData] = useState();
  const [reviwesData, setReviwesData] = useState();
  console.log("student", student, appliedData);
  const getStudentInfos = async () => {
    try {
      const { data } = await axios.get(`/v2/particularappliedclg/get/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setStudent(data.appliedclgdata[0]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load data !!");
    }
  };

  const AppliedCollege = async () => {
    try {
      const { data } = await axios.get(
        `/v2/appliedclg/get/${student?.studentid}`
      );
      setAppliedData(data?.appliedClgData);
    } catch (err) {
      console.log(err);
      toast.error("Somthing wents wrong !!");
    }
  };

  const Reviwes = async () => {
    try {
      const { data } = await axios.get(
        `/v2/get/reviews/student/${student?.studentid}`
      );
      setReviwesData(data?.responseDataArray);
    } catch (err) {
      console.log(err);
      toast.error("Somthing wents wrong !!");
    }
  };

  useEffect(() => {
    AppliedCollege();
  }, [appliedData === undefined ? appliedData : "", student]);

  useEffect(() => {
    Reviwes();
  }, [reviwesData === undefined ? reviwesData : ""]);

  useEffect(() => {
    getStudentInfos();
  }, [student === undefined ? student : ""]);

  return (
    <Layout headerTitle={"Student Profile"}>
      <Wrapper>
        <div className="student-info-left">
          <div className="student-header">
            <div className="student-avatar">
              <div className="student-avatar-in">
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
                  alt=""
                />
              </div>
              {/* <div className="edit-avatar-btn">
                <button>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2441 19.943H4.68208C3.47536 19.9204 2.327 19.4198 1.48909 18.5511C0.651169 17.6825 0.192205 16.5168 0.213085 15.31V9.01004C0.193809 7.80422 0.653444 6.63995 1.49116 5.77243C2.32888 4.90491 3.47633 4.40489 4.68208 4.38202C4.72472 4.38485 4.76718 4.37396 4.80317 4.35092C4.83916 4.32789 4.86674 4.29393 4.88203 4.25403L4.94209 4.12604L5.02705 3.94003C5.29505 3.35603 5.59803 2.69304 5.78303 2.31104C5.97476 1.86852 6.29086 1.49119 6.69294 1.22491C7.09503 0.958635 7.5658 0.814863 8.04805 0.811035H12.876C13.3599 0.813998 13.8325 0.957286 14.2365 1.22354C14.6405 1.4898 14.9585 1.86758 15.1521 2.31104C15.3131 2.64604 15.5621 3.18302 15.7951 3.70102L15.9401 4.02002L16.0401 4.25403C16.0589 4.29236 16.0881 4.32464 16.1243 4.34726C16.1606 4.36988 16.2024 4.38192 16.2451 4.38202C17.451 4.40463 18.5988 4.90451 19.4367 5.77206C20.2747 6.63961 20.7343 7.80405 20.715 9.01004V15.31C20.7356 16.517 20.2765 17.6829 19.4382 18.5516C18.5999 19.4202 17.4511 19.9207 16.2441 19.943ZM10.4631 7.61002C9.92755 7.61124 9.39786 7.72138 8.9062 7.93369C8.41454 8.14599 7.9712 8.45605 7.6031 8.84503C6.84394 9.63485 6.42424 10.6906 6.43403 11.786C6.41475 12.8723 6.82745 13.9218 7.58137 14.704C8.3353 15.4862 9.36881 15.9373 10.455 15.958H10.4621C10.9932 15.9572 11.5187 15.8487 12.0067 15.639C12.4946 15.4293 12.935 15.1228 13.3011 14.738C14.0594 13.9479 14.4851 12.8967 14.4903 11.8016C14.4955 10.7065 14.0798 9.6513 13.3291 8.85403L13.3111 8.83603C12.9445 8.44907 12.5029 8.14083 12.0133 7.93005C11.5236 7.71928 10.9962 7.61037 10.4631 7.61002ZM16.2141 7.35602C15.8215 7.35681 15.4454 7.5134 15.1683 7.79138C14.8911 8.06936 14.7356 8.44601 14.736 8.83853C14.7364 9.23106 14.8927 9.60735 15.1704 9.88477C15.4481 10.1622 15.8246 10.318 16.2171 10.318C16.6096 10.318 16.986 10.1622 17.2637 9.88477C17.5414 9.60735 17.6977 9.23106 17.6981 8.83853C17.6985 8.44601 17.5431 8.06936 17.2659 7.79138C16.9888 7.5134 16.6126 7.35681 16.22 7.35602H16.2141ZM10.4631 14.365C9.79224 14.3548 9.15288 14.0784 8.68574 13.5969C8.2186 13.1153 7.96196 12.4679 7.97212 11.797V11.775C7.96663 11.4414 8.02717 11.1101 8.15022 10.8C8.27327 10.4898 8.45632 10.2071 8.68904 9.96802C8.91433 9.72746 9.18629 9.53526 9.48823 9.40314C9.79018 9.27101 10.1158 9.20171 10.4454 9.19946C10.775 9.19722 11.1016 9.26207 11.4053 9.39008C11.7091 9.51808 11.9836 9.70656 12.2121 9.94403C12.6836 10.4337 12.9488 11.0857 12.9531 11.7654C12.9574 12.4451 12.7003 13.1005 12.2351 13.596C12.0078 13.8387 11.7334 14.0324 11.4288 14.1655C11.1241 14.2986 10.7955 14.3682 10.4631 14.37V14.365Z"
                      fill="#7A86A1"
                    />
                  </svg>
                </button>
              </div> */}
            </div>

            <div className="student-header-info">
              <div className="student-name">
                <h4>
                  {student?.student_detail?.[0]?.name}{" "}
                  {student?.student_detail?.[0]?.surname}
                </h4>
                <p>
                  {student?.student_detail?.[0]?.city},{" "}
                  {student?.student_detail?.[0]?.district},{" "}
                  {student?.student_detail?.[0]?.state}
                </p>
              </div>

              <div className="admission-form-cta">
                <button>Admission Form</button>
              </div>
            </div>
          </div>

          <div className="student-details-main">
            <div className="title">
              <h2>Student Details</h2>
            </div>
            <div className="student-details-in">
              <StudentDetail
                title="Full Name"
                name={student?.student_detail?.[0]?.name}
              />
              <StudentDetail
                title="Father name"
                name={student?.parent_detail?.[0]?.name_of_father}
              />
              <StudentDetail title="Mother name" name="Data not found" />
              <StudentDetail
                title="Mother tongue"
                name={student?.student_detail?.[0]?.mother_tongue}
              />
              <StudentDetail
                title="Date of Birth"
                name={student?.student_detail?.[0]?.dob}
              />
              <StudentDetail
                title="Gender"
                name={student?.studentname?.[0]?.gender}
              />
              <StudentDetail
                title="school studies"
                name={student?.student_detail?.[0]?.school_last_studied}
              />
              <StudentDetail title="Place" name="data not found" />
              <StudentDetail title="Community" name="BC-D (19)" />
              <StudentDetail
                title="Religion"
                name={student?.student_detail?.[0]?.religion}
              />
              <StudentDetail
                title="District"
                name={student?.student_detail?.[0]?.district}
              />
              <StudentDetail title="Mandal" name="Data not found" />
              <StudentDetail title="Stream" name="Data not found" />
              <StudentDetail
                title="Group/ Course"
                name={student?.student_detail?.[0]?.groupe_applied}
              />
              <StudentDetail
                title="2nd Language"
                name={student?.student_detail?.[0]?.second_language}
              />
              <StudentDetail title="Medium" name="Data not found" />
              <StudentDetail
                title="Email"
                name={student?.studentname?.[0]?.email}
              />
              <StudentDetail title="Phone" name="Data not found" />
              <StudentDetail
                title="Reservation"
                name={student?.student_detail?.[0]?.reservation}
              />
              <StudentDetail title="Medium" name="English" />
            </div>
          </div>
        </div>
        <div className="student-info-right">
          <div className="applied-clg-main">
            <div className="Aclg-title">
              <h4>Applied Colleges</h4>
            </div>
            <ul className="Aclg-list">
              {appliedData?.map((item) => {
                return (
                  <>
                    <li>
                      <p>{item?.college?.[0]?.collegename}</p>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="Sclg-list-main">
            <ul>
              {reviwesData?.map((item) => {
                return (
                  <>
                    <li>
                      <h4>{item?.data?.collegename}</h4>
                      <Rating
                        value={item?.data?.reviewStar}
                        stars={4}
                        readOnly
                        cancel={false}
                      />
                      <p>{item?.data?.text}</p>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default StudentProf;
