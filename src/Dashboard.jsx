import CollegesBlock from "./components/CollegesBlock";
import Layout from "./components/Layout";
import styled from "styled-components";
import TaskBlock from "./components/TaskBlock";
import TeamActivity from "./components/TeamActivity";
import AdmissionBlock from "./components/AdmissionBlock";
import ApplicationData from "./components/ApplicationData";
import FeaturedColleges from "./components/FeaturedColleges";
import MonthEarning from "./components/MonthEarning";
import { useLoadingBar } from "./context/LoadingBarContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  gap: 32px;

  .left-main {
    display: flex;
    flex-direction: column;
    flex: 6;
    /* padding-right: 32px;
      width: calc(100% - 434px); */

    .left-top {
      display: flex;
      width: 100%;
      gap: 32px;

      .colleges {
        /* width: 620px; */
        flex: 2;
      }

      .task-team-main {
        /* min-width: calc(100% - 652px); */
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;

        .tasks {
          height: 50%;
        }
        .team-activity {
          height: 50%;
        }
      }
    }

    .left-bottom {
      width: 100%;
      padding-top: 32px;
      display: flex;
      gap: 32px;

      .left {
        /* width: 358px; */
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .right {
        flex: 2;

        .featured {
          height: 100%;
        }
      }
    }
  }

  .right-main {
    /* width: 434px; */
    flex: 2;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;

    .left-main {
      flex: 1;

      .left-top {
        flex-direction: column;
      }
      .left-bottom {
        flex-direction: column;
      }
    }
    .right-main {
      flex: 1;
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    flex-direction: column;

    .left-main {
      flex: 1;

      .left-bottom {
        .left {
          flex: 1;
        }
        .right {
          flex: 1;
        }
      }
    }
    .right-main {
      flex: 1;
    }
  }
  @media (min-width: 1281px) and (max-width: 1620px) {
    flex-direction: column;

    .left-main {
      flex: 1;

      .left-bottom {
        .left {
          flex: 1;
        }
        .right {
          flex: 1;
        }
      }
    }
    .right-main {
      flex: 1;
    }
  }
`;

const Dashboard = () => {
  const [countData, setCountData] = useState();
  const { setProgressBar } = useLoadingBar();
  useEffect(() => {
    setProgressBar(50);
    setProgressBar(100);
  }, [setProgressBar]);

  const ChartData = async () => {
    try {
      const { data } = await axios.get("/dashboard/v2/get/counts/superadmin");
      setCountData(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    ChartData();
  }, [countData === undefined ? countData : ""]);

  return (
    <Layout>
      <Wrapper>
        <div className="left-main">
          <div className="left-top">
            <div className="colleges">
              <CollegesBlock countData={countData}/>
            </div>
            <div className="task-team-main">
              <div className="tasks">
                <TaskBlock />
              </div>
              <div className="team-activity">
                <TeamActivity />
              </div>
            </div>
          </div>

          <div className="left-bottom">
            <div className="left">
              <div className="admission">
                <AdmissionBlock countData={countData}/>
              </div>
              <div className="application-data">
                <ApplicationData />
              </div>
            </div>

            <div className="right">
              <div className="featured">
                <FeaturedColleges countData={countData}/>
              </div>
            </div>
          </div>
        </div>

        <div className="right-main">
          <MonthEarning />
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Dashboard;
