import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 150px;

  .tnc-left {
    flex: 1;
    .tnc-condition {
      .label {
        padding-bottom: 14px;
        p {
          font-weight: 400;
          font-size: 25px;
          line-height: 33px;
          color: #60269e;
        }
      }

      .field {
        max-width: 577px;
        height: 182px;
        border: 1px solid #707070;
        border-radius: 20px;
        overflow: hidden;

        textarea {
          width: 100%;
          height: 100%;
          resize: none;
          padding: 5px 10px;
          outline: none;
        }
      }
    }
  }
  .tnc-right {
    flex: 1;

    .form-ctas {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 60px;
      gap: 32px;
      button {
        background: #60269e;
        padding: 10px 52px;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #ffffff;
        border-radius: 14px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const InputFieldStyle = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  .label {
    width: 130px;

    p {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #000000;
      text-transform: capitalize;
    }
  }

  .field {
    width: calc(100% - 130px);

    input {
      width: 100%;
      height: 45px;
      border: 1px solid #707070;
      border-radius: 16px;
      padding: 0 20px;
      font-weight: 400;
      font-size: 12px;
      line-height: 13px;
      color: #000;
      outline: none;
    }
  }
`;

export const InputField = ({ title, name, placeholder, required = false }) => {
  return (
    <InputFieldStyle>
      <div className="label">
        <p>{title}</p>
      </div>
      <div className="field">
        <input
          type="url"
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </InputFieldStyle>
  );
};

const TandCBlock = () => {
  const formRef = useRef(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Saving...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, please add college details first");
        return false;
      }

      const newObj = {
        collegeid: collegeId,
        terms_condition: e.target.terms.value,
        website: e.target.website.value,
        facebook: e.target.facebook.value,
        youtube: e.target.youtube.value,
        instagram: e.target.instagram.value,
      };

      const { data } = await axios.post("/v2/reg/clgplcysocial", newObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (data) {
        formRef.current.reset();
        localStorage.removeItem("collegeId");
        navigate("/colleges");
      }

      toast.dismiss(loading);
      toast.success("College created Successfully.");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Details not added, please try again");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <Wrapper>
        <div className="tnc-left">
          <div className="tnc-condition">
            <div className="label">
              <p>TERMS & CONDITIONS</p>
            </div>
            <div className="field">
              <textarea name="terms"></textarea>
            </div>
          </div>
        </div>
        <div className="tnc-right">
          <div className="tnc-links-field">
            <InputField
              title={"website"}
              name="website"
              placeholder={"www.example.com"}
            />
            <InputField
              title={"facebook"}
              name={"facebook"}
              placeholder={"www.facebook.com/example"}
            />
            <InputField
              title={"youtube"}
              name={"youtube"}
              placeholder={"www.youtube.com/example"}
            />
            <InputField
              title={"instagram"}
              name={"instagram"}
              placeholder={"www.Instagrame.com/college"}
            />
          </div>

          <div className="form-ctas">
            {/* <button>Edit</button> */}
            <button>Save</button>
          </div>
        </div>
      </Wrapper>
    </form>
  );
};

export default TandCBlock;
