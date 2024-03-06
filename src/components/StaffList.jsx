import styled from "styled-components";
import VisibilityStatus from "./VisibilityStatus";
import EditIcon from "../Icons/EditIcon";

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

const StaffList = ({ faculty, getCollegeDetails }) => {
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

        <div className="edit-button">
          <button>
            <EditIcon />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default StaffList;
