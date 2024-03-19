import styled from "styled-components";
import VisibilityStatus from "./VisibilityStatus";
import EditIcon from "../Icons/EditIcon";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 32px;

  .faculty-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px;
    border: 1px solid #60269e;
    border-radius: 8px;
    width: calc(100% - 182px);

    .faculty-in {
      border-left: 1px solid #60269e;
      &.Fname {
        border: none !important;
      }
    }

    .Finfo {
      display: flex;
      align-items: center;

      .Fdesignation {
        width: 148px;
      }

      .Fid {
        width: 104px;
      }
    }

    p {
      padding: 6px 15px;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #707070;
      text-transform: uppercase;
    }
  }

  .Fstatus {
    display: flex;
    align-items: center;
  }

  .edit-button {
    button {
      height: 20px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .faculty-info {
      flex-direction: column;

      .Finfo {
        flex-direction: column;
      }

      .faculty-in {
        border: none;
      }
    }
  }

  @media (min-width: 1281px) and (max-width: 1820px) {
    flex-direction: column;

    .faculty-info {
      flex-direction: column;
      width: 100%;

      .Finfo {
        flex-direction: column;
      }

      .faculty-in {
        border: none;
      }
    }
  }
`;

const StaffList = ({ faculty, getCollegeDetails, setSelectedId }) => {
  console.log("faculty", faculty);

  const handleRemove = async () => {
    const loading = toast.loading("Delete Details...");
    try {
      const { data } = await axios.delete(
        `/v2/delete/staff/${faculty?.staffid}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.dismiss(loading);
      getCollegeDetails();
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      toast.dismiss(loading);
    }
  };
  return (
    <Wrapper>
      {/* {faculty.isOpen === true ? ( */}
      <div className="faculty-info">
        <div className="faculty-in Fname">
          <p>{faculty.name}</p>
        </div>
        <div className="Finfo">
          <div className="faculty-in Fdesignation">
            <p>{faculty.designation} TEACHER</p>
          </div>
          <div className="faculty-in Fid">
            <p>ID {faculty.id}</p>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}

      <div className="Fstatus">
        <div className="visibility-status">
          <VisibilityStatus
            Fid={faculty.staffid}
            visi={faculty.isOpen}
            getCollegeDetails={getCollegeDetails}
          />
        </div>

        <div className="edit-button flex">
          <button
            className="mr-2"
            onClick={() => setSelectedId(faculty?.staffid)}
          >
            <EditIcon />
          </button>
          <button onClick={() => handleRemove()}>
            <svg
              width="20"
              height="16"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.27794 25.4771C5.34731 25.4738 4.4548 25.1068 3.79125 24.4542C3.1277 23.8017 2.74571 22.9155 2.72692 21.985C2.34792 18.468 1.71389 10.1551 1.70189 10.0701C1.68895 9.81928 1.77194 9.57293 1.93395 9.38104C2.01333 9.29144 2.11074 9.21964 2.21984 9.17035C2.32893 9.12106 2.44729 9.09544 2.567 9.09509H19.3669C19.4867 9.09711 19.6047 9.12379 19.7136 9.17352C19.8225 9.22325 19.92 9.29496 20 9.38409C20.0805 9.47856 20.1413 9.58816 20.1789 9.70648C20.2166 9.8248 20.2302 9.94942 20.219 10.0731C20.219 10.1571 19.5729 18.4841 19.2049 21.9871C19.1858 22.9317 18.7924 23.8301 18.1112 24.4849C17.43 25.1397 16.5166 25.4973 15.5719 25.4791C14.0079 25.5111 12.472 25.524 10.963 25.524C9.365 25.525 7.79794 25.5131 6.27794 25.4771ZM0.92699 7.10809C0.692682 7.10052 0.47074 7.00119 0.308948 6.83154C0.147155 6.66189 0.058468 6.43545 0.0619994 6.20105V5.73108C0.0566302 5.49615 0.144696 5.26868 0.306872 5.09863C0.469049 4.92858 0.692074 4.82986 0.92699 4.8241H4.458C4.8135 4.81732 5.15602 4.68924 5.42882 4.46118C5.70162 4.23312 5.88831 3.91874 5.958 3.57007L6.14196 2.72705C6.25745 2.19494 6.54893 1.7173 6.96935 1.37128C7.38976 1.02525 7.91458 0.83107 8.45897 0.820068H13.459C13.9933 0.831212 14.5088 1.0191 14.9249 1.35437C15.3411 1.68964 15.6343 2.15342 15.7589 2.6731L15.959 3.57306C16.0281 3.92208 16.2146 4.23695 16.4875 4.46527C16.7604 4.69359 17.1032 4.8216 17.459 4.82806H20.991C21.2252 4.83279 21.4479 4.93017 21.6105 5.09888C21.773 5.26758 21.8619 5.49387 21.8579 5.72809V6.19806C21.8614 6.43213 21.773 6.65829 21.6117 6.82788C21.4503 6.99747 21.2289 7.09695 20.995 7.10504L0.92699 7.10809Z"
                fill="#60269E"
              />
            </svg>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default StaffList;
