import axios from "axios";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import StaffList from "./StaffList";
import StaffForm from "./StaffForm";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;

  .staff-list-main {
    max-height: 560px;
    overflow-y: scroll;
    padding-right: 10px;
    flex: 1;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
      border: 1px solid #707070;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background: #60269e;
      border-radius: 100px;
    }
  }

  .staff-form-main {
    padding-left: 60px;
    flex: 1;
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    flex-direction: column;
    gap: 40px;

    .staff-form-main {
      padding: 0;
    }
  }

  @media (min-width: 1281px) and (max-width: 1840px) {
    .staff-form-main {
      padding-left: 10px;
    }
  }
`;

const StaffInfoBlock = ({ data, id, getCollegeDetails }) => {
  const [staffData, setStaffData] = useState([]);

  const setFetchedValue = () => {
    setStaffData(data);
  };

  useEffect(() => {
    setFetchedValue();
  }, []);

  useEffect(() => {
    setFetchedValue();
  }, [data]);

  // const getStaffData = async () => {
  //    try {
  //       const { data } = await axios.get("/v2/staffdetail/get");
  //       const staffList = data.staff

  //       const tempList = []

  //       staffList.forEach(item => {
  //          if (item.collegeid == localStorage.getItem('collegeId')) {
  //             tempList.push(item)
  //          }
  //       })
  //       setStaffData(tempList)
  //    } catch (err) {
  //       console.log(err)
  //       toast.error("Something went wrong...");
  //    }
  // }

  // useEffect(() => {
  //    getStaffData()
  // },[])

  return (
    <Wrapper>
      <div className="staff-list-main">
        <ul>
          {staffData?.length === 0 && <p>No Staff Data</p>}
          {staffData.map((faculty, index) => (
            <StaffList
              faculty={faculty}
              key={index}
              getCollegeDetails={getCollegeDetails}
            />
          ))}
        </ul>
      </div>
      <div className="staff-form-main">
        <StaffForm
          staffData={staffData}
          setStaffData={setStaffData}
          id={id}
          getCollegeDetails={getCollegeDetails}
        />
      </div>
    </Wrapper>
  );
};

export default StaffInfoBlock;
