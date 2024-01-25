import Layout from "./components/Layout";
import styled from "styled-components";
import AdmissionDonut from "./components/AdmissionDonut";
import ApplicantsTable from "./components/ApplicantsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DoughnutChart from "./components/DoughnutChart";
import { useLoadingBar } from "./context/LoadingBarContext";

const Wrapper = styled.div`
  border: 1px solid #707070;
  border-radius: 20px;
  overflow: hidden;
  padding: 27px 40px 30px;

  .applicants-list-header {
    .header-title {
      padding-bottom: 60px;
      h2 {
        font-weight: 400;
        font-size: 30px;
        line-height: 40px;
        color: #60269e;
      }
    }
  }
  .Admissions-block {
    .Admission-block-title {
      padding-bottom: 6px;
      h3 {
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        color: #7a86a1;
      }
    }

    .Admissions-counter-main {
      display: flex;
      align-items: center;
      padding-bottom: 40px;
      gap: 60px;

      .Acounter-left-main {
        display: flex;
        align-items: center;
        gap: 38px;

        h5 {
          font-weight: 400;
          font-size: 66px;
          line-height: 88px;
          color: #000000;
        }
        .compare-progress {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #f6efff;
          padding: 7px 20px 7px 14px;
          border-radius: 14px;

          .icon {
            width: 20px;

            img {
              width: 100%;
            }
          }

          .text {
            font-weight: 400;
            font-size: 17px;
            line-height: 23px;
            color: #60269e;
          }
        }
      }

      .Acounter-right-main {
        /* width: 300px; */
        display: flex;
        align-items: center;
        gap: 20px;

        .chart-legend {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;

          .legend-item {
            display: flex;
            gap: 10px;
            align-items: center;

            .label-color {
              height: 10px;
              width: 12px;
              border-radius: 100px;
            }

            .label-name {
              color: #7a86a1;
              font-size: 19px;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 17px 26px 10px;
    .applicants-list-header {
      .header-title {
        padding-bottom: 30px;
      }
    }

    .Admissions-block {
      .Admissions-counter-main {
        flex-direction: column;
        gap: 30px;
        align-items: start;
        padding-bottom: 20px;
        .Acounter-left-main {
          h5 {
            font-size: 56px;
            line-height: 68px;
          }
        }

        .Acounter-right-main {
          align-self: center;
        }
      }
    }
  }
`;

const Applicants = () => {
  const { setProgressBar } = useLoadingBar();
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [applicantsCount, setApplicantsCount] = useState(0);

  const getCount = async () => {
    try {
      setProgressBar(20);
      const { data } = await axios.get("/v2/admissionlist/get");
      setProgressBar(80);
      setApplicantsCount(data.admission.length);
      setRecord(data.admission);
      setProgressBar(100);
      setData([
        {
          name: "Applied",
          y: data.admission?.filter((item) => {
            return item?.status === "applied";
          })?.length,
          color: "#C2589D",
        },
        {
          name: "Accepted",
          y: data.admission?.filter((item) => {
            return item?.status === "accepted";
          })?.length,
          color: "#F89B44",
        },
        {
          name: "Rejected",
          y: data.admission?.filter((item) => {
            return item?.status === "rejected";
          })?.length,
          color: "#B1DA6D",
        },
        // { name: "Withdraw", y: 20, color: "#707070" },
      ]);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !!");
    }
  };

  useEffect(() => {
    getCount();
    setLoading(false);
  }, []);

  return (
    <Layout headerTitle={"Applicants"}>
      <Wrapper>
        <div className="applicants-list-header">
          <div className="header-title">
            <h2>Admission Data</h2>
          </div>
        </div>

        <div className="Admissions-block">
          <div className="Admission-block-title">
            <h3>Total Admissions</h3>
          </div>

          <div className="Admissions-counter-main">
            <div className="Acounter-left-main">
              <h5 className="counter">{applicantsCount}</h5>
              <div className="compare-progress">
                <div className="icon">
                  <img src={"/arrow-up.svg"} alt="" />
                </div>
                <div className="text">+3 this week</div>
              </div>
            </div>
            <div className="Acounter-right-main">
              {/* <AdmissionDonut /> */}
              <DoughnutChart data={data} />
              <div className="chart-legend">
                {data?.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div
                      className="label-color"
                      style={{ background: item.color }}
                    ></div>
                    <p className="label-name">{item.name}</p>
                    <p className="label-name">({item.y})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="applicants-table-main">
          <ApplicantsTable record={record} loading={loading} />
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Applicants;
