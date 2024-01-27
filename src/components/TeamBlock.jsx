import styled from "styled-components";
import Calendar from "./Calendar";
import InsertTeamForm from "./InsertTeamForm";
import TeamTable from "./TeamTable";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { useLoadingBar } from "../context/LoadingBarContext";

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 58px;

  .Team-left-table {
    width: calc(100% - 434px);
    border: 1px solid #707070;
    border-radius: 20px;
    padding: 35px 60px 60px;

    .team-table-title {
      padding-bottom: 30px;
      h2 {
        font-weight: 400;
        font-size: 30px;
        line-height: 40px;
        color: #60269e;
      }
    }

    .team-form {
      padding-bottom: 46px;
    }
  }
  .Calendar-block {
    width: 100%;
    max-width: 434px;
    border: 1px solid #707070;
    border-radius: 20px;
    padding: 20px 35px;
  }

  @media (min-width: 768px) and (max-width: 1440px) {
    flex-direction: column-reverse;
    gap: 30px;

    .Team-left-table {
      width: 100%;
      padding: 15px 20px 30px;
    }

    .p-datatable.p-datatable-lg .p-datatable-header {
      padding: 1.25rem 0;
    }

    .Calendar-block {
      max-width: 100%;
    }
  }

  @media (min-width: 1281px) and (max-width: 1440px) {
    .Team-left-table {
      padding: 35px 60px 60px;
    }
  }
`;

const TeamBlock = () => {
  const { setProgressBar } = useLoadingBar();
  useEffect(() => {
    setProgressBar(50);
    setProgressBar(100);
  }, [setProgressBar]);
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setProgressBar(30);
      const { data } = await axios("/v2/team/getdata", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setProgressBar(100);
      setRecord(data.teamdata);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !!");
    }
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  // const submitOnServer = async () => {
  //    try {
  //       const { data } = await axios.post("/v2/reg/team", formValue);
  //       console.log(data);
  //       setRecord([{...formValue}, ...record])
  //       setFormValue(null);
  //    } catch (err) {
  //       console.log(err);
  //    }
  // }

  // const handleSubmit = () => {
  //    const callFunction = submitOnServer();
  //    toast.promise(callFunction, {
  //       loading: 'Adding Member...',
  //       error: 'Member Not Added !!',
  //       success: 'Member Added successfully !!'
  //    })
  // };

  return (
    <Wrapper>
      <div className="Team-left-table">
        <div className="team-table-title">
          <h2>Team Scolage</h2>
        </div>

        <div className="team-form">
          <InsertTeamForm record={record} setRecord={setRecord} />
        </div>

        <div className="team-table">
          <TeamTable loading={loading} setRecord={setRecord} record={record} />
        </div>
      </div>

      <div className="Calendar-block">
        <Calendar />
      </div>
    </Wrapper>
  );
};

export default TeamBlock;
