import styled from "styled-components";
import AddIconBig from "../Icons/AddIconBig";
import RemoveIcon from "../Icons/RemoveIcon";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoadingBar } from "../context/LoadingBarContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRef } from "react";

const Wrapper = styled.div`
  .images-block-main {
    display: flex;
    flex-wrap: wrap;
    gap: 60px 30px;

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
  }
`;

const ImageItemStyle = styled.div`
  width: 200px;
  .clg-image-block {
    height: 182px;
    border: 1px solid #707070;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;

    .clg-img {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .img-ctas {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      label {
        border: 1px solid #707070;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 15px 20px;
        background: #f8f8f8;
        border-radius: 16px;
        cursor: pointer;

        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #7a86a1;
        }
      }
      button {
        border: 1px solid #707070;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 15px 20px;
        background: #f8f8f8;
        border-radius: 16px;
        cursor: pointer;

        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #7a86a1;
        }
      }
    }

    &:hover {
      .img-ctas {
        display: flex;
      }
    }
  }

  .clg-img-title {
    background: #f8f8f8;
    border: 1px solid #707070;
    padding: 6px 4px 4px;
    input {
      width: 100%;
      background: transparent;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000;
      outline: none;
      text-align: center;
    }
  }
`;

const CollegeImagesBlock = () => {
  const { setProgressBar } = useLoadingBar();
  const [collegeImage, setCollegeImage] = useState([
    { image: null, imagePreview: null, title: "" },
  ]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const formRef = useRef(null);

  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    const onChangeVal = [...collegeImage];
    if (name == "image") {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `college\$${uuidv4()}\$${localStorage.getItem(
        "collegeId"
      )}.${fileExt}`;
      const tempFile = new File([file], fileName);
      onChangeVal[i][name] = tempFile;
      if (tempFile) {
        const reader = new FileReader();
        reader.onload = () => {
          onChangeVal[i].imagePreview = reader.result;
          forceUpdate();
        };

        reader.readAsDataURL(tempFile);
      }
    } else {
      onChangeVal[i][name] = value;
    }
    setCollegeImage(onChangeVal);
  };

  const handleFormSubmit = async (e) => {
    setProgressBar(20);
    e.preventDefault();
    const loading = toast.loading("Saving...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, please add college details first");
        return false;
      }

      const formData = new FormData();
      collegeImage.forEach((item, index) => {
        formData.append(`image`, item.image);
        formData.append(`name`, item.title);
      });
      formData.append("collegeid", collegeId);

      setProgressBar(50);

      const { data } = await axios.post("/v2/reg/clgimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      // if (data) {
      //   formRef.current.reset();
      //   setCollegeImage([{ image: null, imagePreview: null, title: "" }]);
      // }
      toast.dismiss(loading);
      toast.success(data?.message);
      setProgressBar(100);
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error(err?.response?.data?.error);
      setProgressBar(0);
    }
  };

  const handleRemoveImage = (e, i) => {
    e.preventDefault();
    const onChangeVal = [...collegeImage];
    onChangeVal[i]["image"] = null;
    onChangeVal[i]["imagePreview"] = null;
    setCollegeImage(onChangeVal);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setCollegeImage([
      ...collegeImage,
      { image: null, imagePreview: null, title: "" },
    ]);
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <Wrapper>
        <div className="images-block-main">
          {collegeImage.map((item, i) => (
            <ImageItemStyle key={i}>
              <div className="clg-image-block">
                <div className="clg-img">
                  {item.imagePreview ? (
                    <img src={item.imagePreview} alt="" />
                  ) : (
                    <p>Add Image*</p>
                  )}
                </div>
                <div className="img-ctas">
                  <label className="edit-cta" htmlFor={`college-image-${i}`}>
                    <AddIconBig />
                    <p>{item.image ? "Edit" : "Add"}</p>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    name="image"
                    id={`college-image-${i}`}
                    onChange={(e) => handleChange(e, i)}
                    style={{ display: "none" }}
                  />
                  {item.image && (
                    <button
                      type="button"
                      className="remove-cta"
                      onClick={(e) => handleRemoveImage(e, i)}
                    >
                      <RemoveIcon />
                      <p>Remove</p>
                    </button>
                  )}
                </div>
              </div>

              <div className="clg-img-title">
                <input
                  type="text"
                  required
                  name="title"
                  value={item.title}
                  onChange={(e) => handleChange(e, i)}
                  placeholder="Name"
                />
              </div>
            </ImageItemStyle>
          ))}

          <div className="add-sub-cta">
            <button type="button" onClick={handleAddField}>
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

export default CollegeImagesBlock;
