import toast from "react-hot-toast";
import CareerIcon from "../Icons/CareerIcon";
import ScholarshipIcon from "../Icons/ScholarshipIcon";
import SkillIcon from "../Icons/SkillIcon";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import HighlightChecksEdit from "./HighlightChecksEdit";

const Wrapper = styled.div`
  .highlight-check-main {
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
  }

  .security-block-main {
    padding-top: 40px;

    .security-title {
      padding-bottom: 35px;
      h2 {
        font-weight: 700;
        font-size: 30px;
        line-height: 40px;
        color: #60269e;
      }
    }

    textarea {
      border: 1px solid #707070;
      padding: 30px 30px 30px 60px;
      min-height: 260px;
      width: 100%;
      border-radius: 20px;
      list-style-type: decimal;
      outline: none;

      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #707070;
    }
  }
`;

const HighlightBlock = ({ data, getCollegeDetails }) => {
  const highlightCheckData = [
    {
      id: 1,
      icon: <SkillIcon />,
      key: "skill_development",
      label: "Skill Development",
    },
    {
      id: 2,
      icon: <CareerIcon />,
      key: "career",
      label: "Career Counselling",
    },
    {
      id: 3,
      icon: <ScholarshipIcon />,
      key: "scholarship",
      label: "Scholarship",
    },
  ];
  // console.log(data);
  const [highlightChecks, setHighlightChecks] = useState([]);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleDescChange = (key, value) => {
    if (editable) {
      setFormData({
        ...formData,
        [key]: [
          {
            ...formData[key][0],
            description: value,
          },
        ],
      });
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleCheckChange = (key, value) => {
    if (editable) {
      setFormData({
        ...formData,
        [key]: [
          {
            ...formData[key][0],
            status: value,
          },
        ],
      });
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleChange = (e) => {
    if (editable) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleFormSubmit = async () => {
    const loading = toast.loading("Saving Details...");
    try {
      const { data } = await axios.patch(
        `/v2/reg/highlight/edit/${formData.highlightid}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEditable(false);
      getCollegeDetails();
      toast.dismiss(loading);
      toast.success("Details updated successfully !!");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="highlight-check-main">
          {highlightCheckData.map((item, index) => (
            <HighlightChecksEdit
              key={index}
              data={item}
              name="highlight"
              formData={formData}
              highlightChecks={highlightChecks}
              handleCheckChange={handleCheckChange}
              handleDescChange={handleDescChange}
              setHighlightChecks={setHighlightChecks}
            />
          ))}
        </div>

        <div className="security-block-main">
          <div className="security-title">
            <h2>SAFTY & SECURITY</h2>
          </div>
          <textarea
            value={formData?.safety_security}
            name="safety_security"
            onChange={handleChange}
          ></textarea>
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setFormData(data);
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

export default HighlightBlock;
