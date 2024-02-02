import CareerIcon from "../Icons/CareerIcon";
import ScholarshipIcon from "../Icons/ScholarshipIcon";
import SkillIcon from "../Icons/SkillIcon";
import HighlightChecks from "./HighlightChecks";
import { useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";

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
      border-radius: 20px;
      width: 100%;
      outline: none;
    }

    /* ol {
         border: 1px solid #707070;
         padding: 30px 30px 30px 60px;
         min-height: 260px;
         border-radius: 20px;
         list-style-type: decimal;

         li {
            padding-bottom: 40px;
            p {
               font-weight: 400;
               font-size: 20px;
               line-height: 27px;
               color: #707070;
            }
         }
      } */
  }
`;

const HighlightForm = () => {
  const [highlightChecks, setHighlightChecks] = useState([]);
  const [highlightTexts, setHighlightTexts] = useState([]);

  const formRef = useRef(null);

  const highlightCheckData = [
    {
      id: 1,
      icon: <SkillIcon />,
      value: "skill_development",
      label: "Skill Development",
    },
    {
      id: 2,
      icon: <CareerIcon />,
      value: "career",
      label: "Career Counselling",
    },
    {
      id: 3,
      icon: <ScholarshipIcon />,
      value: "scholarship",
      label: "Scholarship",
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding data...");
    try {
      if (highlightChecks.length === 0) {
        toast.dismiss(loading);
        toast.error("Please select at least one item.");
        return false;
      }

      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      const newObj = {
        collegeid: collegeId,
        safety_security: e.target.safetySecurity.value || "",
      };

      const getDescription = (item) => {
        const value = highlightTexts.filter(
          (textarea) => textarea.name === item
        );
        return value[0]?.value || "";
      };

      highlightChecks.map((item, index) => {
        const tempItem = item;
        newObj[tempItem] = {
          status: true,
          description: getDescription(item),
        };
      });

      const { data } = await axios.post("/v2/reg/highlight", newObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (data) {
        formRef.current.reset();
        setHighlightChecks([]);
        setHighlightTexts([]);
      }
      toast.dismiss(loading);
      toast.success("Data added successfully.");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Data not added, Please try again.");
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Wrapper>
          <div className="highlight-check-main">
            {highlightCheckData?.map((item, index) => (
              <HighlightChecks
                key={index}
                data={item}
                name="highlight"
                highlightTexts={highlightTexts}
                setHighlightTexts={setHighlightTexts}
                highlightChecks={highlightChecks}
                setHighlightChecks={setHighlightChecks}
              />
            ))}
          </div>

          <div className="security-block-main">
            <div className="security-title">
              <h2>SAFETY & SECURITY</h2>
            </div>
            <textarea name="safetySecurity"></textarea>
            {/* <ol>
                  <li>
                     <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod incidunt ut laoreet dolore magna aliquam erat</p>
                  </li>
                  <li>
                     <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod incidunt ut laoreet dolore magna aliquam erat</p>
                  </li>
               </ol> */}
          </div>
        </Wrapper>
        <div className="save-cta-main">
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default HighlightForm;
