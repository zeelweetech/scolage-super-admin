import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
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

// const FieldStyles = styled.div`
//    .subject-input {
//       padding: 0 0 14px 14px;

//       input {
//          color: #60269e;
//          font-family: Segoe UI;
//          font-size: 28px;
//          font-style: normal;
//          font-weight: 400;
//          line-height: normal;
//          outline: none;
//          width: 100%;
//          letter-spacing: 2px;
//       }
//    }

//    .fees-input {
//       display: flex;
//       align-items: center;
//       border: 1px solid #707070;
//       border-radius: 10px;
//       overflow: hidden;
//       padding: 8px;

//       input {
//          text-align: center;
//          width: 50%;
//          font-family: Segoe UI;
//          font-size: 15px;
//          font-style: normal;
//          font-weight: 400;
//          line-height: normal;
//          color: #212121;
//          padding: 6px;
//          outline: none;
//          border: none;

//          &::placeholder {
//             color: #7a86a1;
//          }

//          &:first-child {
//             border-right: 1px solid #707070;
//          }
//       }
//    }
// `;

const FeesBlock = () => {
  // const [inputList, setInputList] = useState([
  //    { subjectName: "M.P.C", minFees: "", maxFees: "" },
  //    { subjectName: "Bi.P.C", minFees: "", maxFees: "" },
  //    { subjectName: "M.E.C", minFees: "", maxFees: "" },
  //    { subjectName: "M.Bi.P.C", minFees: "", maxFees: "" },
  //    { subjectName: "C.E.C", minFees: "", maxFees: "" },
  // ]);

  // const handleClick = () => {
  //    setInputList([...inputList, { subjectName: "", minFees: "", maxFees: "" }]);
  // };

  // const handleChange = (e, i) => {
  //    const { name, value } = e.target;
  //    const onChangeVal = [...inputList];
  //    onChangeVal[i][name] = value;
  //    setInputList(onChangeVal);
  // };

  const formRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Saving...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      const newObj = {
        collegeid: collegeId,
        eligibility_criteria: e.target.eligibility_criteria.value,
        fee_terms: e.target.fees_terms.value,
      };
      const { data } = await axios.post("/v2/reg/feestructure", newObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // if (data) {
      //   formRef.current.reset();
      // }
      toast.dismiss(loading);
      toast.success("Details saved successfully.");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, Please try again.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <Wrapper>
        <div className="criteria-textarea">
          <div className="title">
            <h4>ELIGIBILITY CRITERIA</h4>
          </div>
          <div className="text-field">
            <textarea name="eligibility_criteria"></textarea>
          </div>
        </div>
        <div className="criteria-textarea">
          <div className="title">
            <h4>FEE TERMS</h4>
          </div>
          <div className="text-field">
            <textarea name="fees_terms"></textarea>
          </div>
        </div>
        <div className="save-cta-main">
          <button type="submit">Save</button>
        </div>
      </Wrapper>
    </form>
    // <Wrapper>
    //    <div className="subject-fees-main">
    //       {inputList.map((item, i) => (
    //          <FieldStyles key={i}>
    //             <div className="subject-input">
    //                <input type="text" placeholder="Subject Name" name="subjectName" value={item.subjectName} onChange={(e) => handleChange(e, i)} />
    //             </div>
    //             <div className="fees-input">
    //                <input type="number" className="min-fees" placeholder="10000" name="minFees" value={item.minFees} onChange={(e) => handleChange(e, i)} />
    //                <input type="number" className="max-fees" placeholder="20000" name="maxFees" value={item.maxFees} onChange={(e) => handleChange(e, i)} />
    //             </div>
    //          </FieldStyles>
    //       ))}
    //       <div className="add-dub-fields-cta">
    //          <button onClick={handleClick}>Add More ...</button>
    //       </div>
    //    </div>
    //    <div className="fees-terms-block">
    //       <h4>FEE TERMS</h4>
    //       <div className="terms-textarea">
    //          <textarea name="feesTerms"></textarea>
    //       </div>
    //    </div>
    //    <div className="save-cta-main">
    //       <button>Save</button>
    //    </div>
    // </Wrapper>
  );
};

export default FeesBlock;
