import { useRef, useState } from "react";
import styled from "styled-components";
import { useLoadingBar } from "../context/LoadingBarContext";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.div`
  .subject-seats-block {
    display: flex;
    gap: 40px 140px;
    flex-wrap: wrap;
  }
  .add-sub-cta {
    display: flex;
    align-items: end;
    button {
      background: #60269e;
      padding: 10px 18px;
      border-radius: 20px;
      color: #fff;
      font-family: Segoe UI;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .subject-seats-block {
      gap: 30px 70px;
    }
  }
`;

const SubjectSeatStyles = styled.div`
  width: 160px;
  .subject-field {
    padding: 5px;
    input {
      width: 100%;
      outline: none;
      text-align: center;
      color: #60269e;
      font-family: Segoe UI;
      font-size: 28px;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 2px;
    }
  }

  .sub-desc-field {
    border-radius: 14px;
    border: 1px solid #707070;
    overflow: hidden;
    height: 84px;
    textarea {
      height: 100%;
      width: 100%;
      padding: 10px;
      resize: none;
      border: none;
      outline: none;
    }
  }
  .fees-input {
    display: flex;
    margin-top: 10px;
    align-items: center;
    border: 1px solid #707070;
    border-radius: 10px;
    overflow: hidden;
    padding: 2px;

    input {
      text-align: center;
      width: 50%;
      font-family: Segoe UI;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #212121;
      padding: 6px;
      outline: none;
      border: none;

      &::placeholder {
        color: #7a86a1;
      }

      &:first-child {
        border-right: 1px solid #707070;
      }
    }
  }

  .seat-no-field {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 15px;
    label {
      width: calc(100% - 68px);
      color: #000;
      font-family: Segoe UI;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }
    input {
      width: 68px;
      border: 1px solid #707070;
      border-radius: 10px;
      outline: none;
      padding: 4px;
      color: #000;
      font-family: Segoe UI;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .subject-field {
      input {
        font-size: 20px;
      }
    }
  }
`;

const SubjectBlock = () => {
  const { setProgressBar } = useLoadingBar();
  const collegeid = localStorage.getItem("collegeId");
  const [subjectSeat, setSubjectSeat] = useState([
    {
      subjectname: "",
      description: "",
      no_of_seats: "",
      minFees: "",
      maxFees: "",
    },
  ]);

  const formRef = useRef(null);

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...subjectSeat];
    onChangeVal[i][name] = value;
    setSubjectSeat(onChangeVal);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProgressBar(20);
    const loading = toast.loading("Saving...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }
      setProgressBar(50);

      const tempSubjects = [];

      subjectSeat.forEach((item) => {
        tempSubjects.push({ ...item, collegeid: collegeId });
      });

      const newObj = {
        subject: tempSubjects,
      };

      const { data } = await axios.post("/v2/reg/subject", newObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (data) {
        formRef.current.reset();
        setSubjectSeat([
          {
            collegeid,
            subjectname: "",
            description: "",
            no_of_seats: "",
            minFees: "",
            maxFees: "",
          },
        ]);
      }
      toast.dismiss(loading);
      setProgressBar(100);
    } catch (err) {
      console.log(err.message);
      toast.dismiss(loading);
      toast.error("Something went wrong!");
      setProgressBar(0);
    }
  };

  const handleClick = () => {
    setSubjectSeat([
      ...subjectSeat,
      {
        subjectname: "",
        description: "",
        no_of_seats: "",
        minFees: "",
        maxFees: "",
      },
    ]);
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <Wrapper>
        <div className="subject-seats-block">
          {subjectSeat.map((item, i) => (
            <SubjectSeatStyles key={i}>
              <div className="subject-field">
                <input
                  type="text"
                  name="subjectname"
                  value={item.subjectname}
                  required
                  placeholder="Subject Name"
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
              <div className="sub-desc-field">
                <textarea
                  placeholder="Description"
                  value={item.description}
                  required
                  name="description"
                  onChange={(e) => handleChange(e, i)}
                ></textarea>
              </div>
              <div className="fees-input">
                <input
                  type="number"
                  className="min-fees"
                  placeholder="10000"
                  required
                  name="minFees"
                  value={item.min_fees}
                  onChange={(e) => handleChange(e, i)}
                />
                <input
                  type="number"
                  className="max-fees"
                  placeholder="20000"
                  required
                  name="maxFees"
                  value={item.max_fees}
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
              <div className="seat-no-field">
                <label htmlFor="subSeat">No. of seats</label>
                <input
                  type="number"
                  id="subSeat"
                  placeholder="Seat No"
                  required
                  value={item.no_of_seats}
                  name="no_of_seats"
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
            </SubjectSeatStyles>
          ))}
          <div className="add-sub-cta">
            <button type="button" onClick={handleClick}>
              Add More ...
            </button>
          </div>
        </div>
        <div className="save-cta-main">
          <button type="submit">Save</button>
        </div>
      </Wrapper>
    </form>
  );
};

export default SubjectBlock;
