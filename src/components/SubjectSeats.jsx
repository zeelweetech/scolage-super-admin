import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";

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

const DropdownFieldStyles = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  p {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
    display: flex;
  }

  .dropdown-field {
    width: calc(100% - 1x);

    .p-dropdown {
      width: 100%;
      border: 1px solid #707070;
      border-radius: 16px;
      box-shadow: none;
      .p-dropdown-label {
        padding: 12px 20px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #7a86a1;
        text-transform: capitalize;
      }
    }
  }
`;

const SubjectSeats = ({ data, id, getCollegeDetails }) => {
  // console.log(data);
  const [subjectSeat, setSubjectSeat] = useState([]);
  const [editable, setEditable] = useState(false);
  const [newSubjectSeat, setNewSubjectSeat] = useState([]);
  const systemType = [
    { subjectname: "BCA" },
    { subjectname: "MBA" },
    { subjectname: "BBA" },
    { subjectname: "MCA" },
    { subjectname: "Computer Eng" },
    { subjectname: "IT Eng" },
    { subjectname: "Pharmacy" },
  ];

  const setFetchedData = (data) => {
    const tempArr = [];
    data?.forEach((item, index) => {
      console.log;
      const newObj = {
        subjectid: item?.subjectid,
        subjectname: item?.subjectname,
        description: item?.description,
        no_of_seats: item?.no_of_seats,
        minFees: item?.minFees,
        maxFees: item?.maxFees,
      };
      tempArr.push(newObj);
    });
    setSubjectSeat(tempArr);
  };

  useEffect(() => {
    setFetchedData(data);
  }, []);

  const handleChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...subjectSeat];
      onChangeVal[i][name] = value;
      setSubjectSeat(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...newSubjectSeat];
      onChangeVal[i][name] = value;
      setNewSubjectSeat(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Saving...");
    try {
      const collegeId = id ? id : localStorage.getItem("collegeId");
      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      if (subjectSeat.length) {
        const tempSubjects = [];
        subjectSeat.forEach((item) => {
          tempSubjects.push({ ...item, collegeid: collegeId });
        });

        const newObj = {
          subject: tempSubjects,
        };

        const { data } = await axios.patch("/v2/edit/subject", newObj, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      }

      if (newSubjectSeat.length) {
        const newSubjects = [];
        newSubjectSeat.forEach((item) => {
          newSubjects.push({ ...item, collegeid: collegeId });
        });

        const newObj = {
          subject: newSubjects,
        };

        const { data: newList } = await axios.post("/v2/reg/subject", newObj, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(newList);
        if (newList) {
          setNewSubjectSeat([]);
          setFetchedData(newList.data);
        }
      }
      setEditable(false);
      getCollegeDetails();
      toast.dismiss(loading);
      toast.success("Details updated successfully");
    } catch (err) {
      console.log(err.message);
      toast.dismiss(loading);
      toast.error("Something went wrong!");
    }
  };

  const handleClick = () => {
    if (editable) {
      setNewSubjectSeat([
        ...newSubjectSeat,
        {
          subjectname: "",
          description: "",
          no_of_seats: "",
          minFees: "",
          maxFees: "",
        },
      ]);
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="subject-seats-block">
          {subjectSeat.map((item, i) => (
            <SubjectSeatStyles key={i}>
              <div className="subject-field">
                <DropdownFieldStyles>
                  <div className="dropdown-field">
                    <Dropdown
                      optionLabel="subjectname"
                      optionValue="subjectname"
                      name="subjectname"
                      onChange={(e) => handleChange(e, i)}
                      value={item.subjectname}
                      options={systemType}
                      placeholder="Sub. Na"
                      required
                    />
                  </div>
                </DropdownFieldStyles>
                {/* <input
                  type="text"
                  name="subjectname"
                  value={item.subjectname}
                  required
                  placeholder="Subject Name"
                  onChange={(e) => handleChange(e, i)}
                /> */}
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
                  value={item.minFees}
                  onChange={(e) => handleChange(e, i)}
                />
                <input
                  type="number"
                  className="max-fees"
                  placeholder="20000"
                  required
                  name="maxFees"
                  value={item.maxFees}
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
          {newSubjectSeat.map((item, i) => (
            <SubjectSeatStyles key={i}>
              <div className="subject-field">
                <input
                  type="text"
                  name="subjectname"
                  value={item.subjectname}
                  required
                  placeholder="Subject Name"
                  onChange={(e) => handleNewChange(e, i)}
                />
              </div>
              <div className="sub-desc-field">
                <textarea
                  placeholder="Description"
                  value={item.description}
                  required
                  name="description"
                  onChange={(e) => handleNewChange(e, i)}
                ></textarea>
              </div>
              <div className="fees-input">
                <input
                  type="number"
                  className="min-fees"
                  placeholder="10000"
                  required
                  name="minFees"
                  value={item.minFees}
                  onChange={(e) => handleNewChange(e, i)}
                />
                <input
                  type="number"
                  className="max-fees"
                  placeholder="20000"
                  required
                  name="maxFees"
                  value={item.maxFees}
                  onChange={(e) => handleNewChange(e, i)}
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
                  onChange={(e) => handleNewChange(e, i)}
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
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setSubjectSeat(data);
            }}
          >
            Cancel
          </button>
        )}
        {editable ? (
          <button onClick={handleFormSubmit}>Save</button>
        ) : (
          <button
            id="editBtn"
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default SubjectSeats;
