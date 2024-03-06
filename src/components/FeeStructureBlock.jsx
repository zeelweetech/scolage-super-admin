import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const Wrapper = styled.div`
  .criteria-textarea {
    max-width: 1256px;
    width: 100%;
    padding-bottom: 30px;
    .title {
      padding: 14px;
      h4 {
        color: #60269e;
        font-family: Segoe UI;
        font-size: 25px;
        font-weight: 400;
        line-height: normal;
      }
    }

    .text-field {
      width: 100%;
      height: 128px;
      border: 1px solid #707070;
      border-radius: 20px;
      overflow: hidden;

      textarea {
        height: 100%;
        width: 100%;
        resize: none;
        padding: 10px;
        outline: none;
      }
      outline: none;
    }
  }
  .save-cta-main {
    padding: 0;
  }
`;

const FeeStructureBlock = ({ data, id, getCollegeDetails }) => {
  // console.log(data);
  const [note, setNote] = useState(data);
  const [editable, setEditable] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    if (editable) {
      const { name, value } = e.target;
      setNote({ ...note, [name]: value });
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

      const newObj = {
        // fee_structureid: note.fee_structureid,
        collegeid: collegeId,
        eligibility_criteria: note.eligibility_criteria,
        fee_terms: note.fee_terms,
      };
      const { data } = await axios.patch(
        `/v2/reg/feestrucutre/edit/${note.fee_structureid}`,
        newObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setEditable(false);
      getCollegeDetails();
      toast.dismiss(loading);
      toast.success("Details saved successfully.");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, Please try again.");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="criteria-textarea">
          <div className="title">
            <h4>ELIGIBILITY CRITERIA</h4>
          </div>
          <div className="text-field">
            <textarea
              name="eligibility_criteria"
              value={note.eligibility_criteria}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="criteria-textarea">
          <div className="title">
            <h4>FEE TERMS</h4>
          </div>
          <div className="text-field">
            <textarea
              name="fee_terms"
              value={note.fee_terms}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setNote(data);
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

export default FeeStructureBlock;
