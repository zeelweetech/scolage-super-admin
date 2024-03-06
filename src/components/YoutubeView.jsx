import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const Wrapper = styled.div`
  p {
    font-size: 16px;
    padding-bottom: 10px;
    span {
      font-weight: 600;
      line-height: 24px;
      width: 400px;
      display: block;
    }
  }
`;

const InputFieldStyles = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;

  label {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
  }

  .input {
    width: calc(100% - 135px);

    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #707070;
      padding: 12px 20px;
      border-radius: 16px;
      outline: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000000;
      &:focus {
        border-color: #60269e;
        filter: drop-shadow(1.389px 7.878px 20px rgba(105, 95, 151, 0.122));
      }
    }

    &.input-group {
      display: flex;
      align-items: stretch;
      input {
        border-radius: 16px 0 0 16px;
      }

      .p-dropdown {
        width: 115px;
        box-shadow: none;
        border-color: #707070;
        border-left: 0px;
        border-radius: 0 16px 16px 0;
        .p-dropdown-label {
          padding-right: 0;
          font-weight: 400;
          text-transform: capitalize;
          font-size: 14px;
          line-height: 19px;
          color: #000000;
        }
      }
    }

    &.city-input {
      display: flex;
      gap: 50px;
      .area-block {
        display: flex;
        align-items: center;
        min-width: 250px;
      }
    }
  }
`;

const InputField = ({
  value = "",
  title,
  id,
  handleChange,
  placeholder,
  name,
  type = "text",
  href,
  target,
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>{title}</label>
      <div className="input">
        <input
          type={type}
          value={value}
          autoComplete="off"
          onChange={handleChange}
          id={id}
          name={name}
          placeholder={placeholder}
          //  href={href}
          //  target={target}
          required
        />
      </div>
    </InputFieldStyles>
  );
};

const YoutubeView = ({ data, getCollegeDetails }) => {
  const [formData, setFormData] = useState(data);
  const [editable, setEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editable) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      document.getElementById("editBtn").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleFormSubmit = async () => {
    const loading = toast.loading("Details Saving...");
    try {
      const { data } = await axios.patch(
        `/v2/edit/videoUrl/${formData?.videourlid}`,
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
        <p>
          {/* <a href={data?.videoUrl0} target="_blank"> */}
          <InputField
            name={"videoUrl0"}
            value={formData?.videoUrl0}
            handleChange={handleChange}
            title="Youtube Link 1"
            id="youtubeLink1"
            type="link"
            placeholder="Youtube Link 1"
            // href={data?.videoUrl0}
            // target="_blank"
          />
          {/* </a> */}
        </p>
        <p>
          {/* <a href={data?.videoUrl1} target="_blank"> */}
          <InputField
            name={"videoUrl1"}
            value={formData?.videoUrl1}
            handleChange={handleChange}
            title="Youtube Link 2"
            id="youtubeLink2"
            placeholder="Youtube Link 2"
          />
          {/* </a> */}
        </p>
        <p>
          {/* <a href={data?.videoUrl2} target="_blank"> */}
          <InputField
            name={"videoUrl2"}
            value={formData?.videoUrl2}
            handleChange={handleChange}
            title="Youtube Link 3"
            id="youtubeLink3"
            placeholder="Youtube Link 3"
          />
          {/* </a> */}
        </p>
        <p>
          {/* <a href={data?.videoUrl3} target="_blank"> */}
          <InputField
            name={"videoUrl3"}
            value={formData?.videoUrl3}
            handleChange={handleChange}
            title="Youtube Link 3"
            id="youtubeLink3"
            placeholder="Youtube Link 3"
          />
          {/* </a> */}
        </p>
        <p>
          {/* <a href={data?.videoUrl4} target="_blank"> */}
          <InputField
            name={"videoUrl4"}
            value={formData?.videoUrl4}
            handleChange={handleChange}
            title="Youtube Link 5"
            id="youtubeLink5"
            placeholder="Youtube Link 5"
          />
          {/* </a> */}
        </p>
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

export default YoutubeView;
