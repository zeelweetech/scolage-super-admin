import toast from "react-hot-toast";
import CameraIcon from "../Icons/CameraIcon";
import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoIosClose } from "react-icons/io";

const Wrapper = styled.div`
  .gallery-fields {
    display: flex;
    gap: 50px 60px;
    flex-wrap: wrap;

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
  .save-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 48px;
    button {
      background: #60269e;
      filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
      border-radius: 16px;
      padding: 12px 34px;
      font-weight: 400;
      font-size: 13px;
      line-height: 17px;
      color: #ffffff;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .gallery-fields {
      gap: 30px;
    }
  }
`;

const GalleryStyle = styled.div`
  width: 195px;
  .image-block {
    height: 216px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid #707070;
    overflow: hidden;
    position: relative;
    margin-bottom: 12px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .remove-btn {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 0 0 10px;
      box-shadow: 0 0 10px 5px rgb(0 0 0 / 0.1);
      background: #fff;
      button {
        font-size: 24px;
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .image-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #fff;
      border-radius: 10px 0 0 0;
      label {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .info-block {
    border: 1px solid #707070;
    height: 44px;
    border-radius: 6px;
    overflow: hidden;

    textarea {
      height: 100%;
      width: 100%;
      padding: 5px 10px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #000;
      outline: none;
      resize: none;
      background: #f8f8f8;
    }
  }
`;

const SportUploadBlock = () => {
  const [sportsList, setSportsList] = useState([
    { image: "", more_info: "", imgPreview: "" },
  ]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [removeData, setRemoveData] = useState(false);

  const formRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding details...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      const formData = new FormData();

      sportsList.forEach((item, index) => {
        formData.append(`image`, item.image);
        formData.append(`more_info`, item.more_info);
      });
      formData.append("collegeid", collegeId);

      const { data } = await axios.post("/v2/reg/sportsdetail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      setRemoveData(false);

      // if (data) {
      //   formRef.current.reset();
      //   setSportsList([{ image: "", more_info: "", imgPreview: "" }]);
      // }
      toast.dismiss(loading);
      toast.success("Details added successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Details not added, please try again");
    }
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...sportsList];
    if (name == "image") {
      let file = e.target.files[0];
      // 'sports + array.length + collegeid + ext'
      const fileExt = file.name.split(".").pop();
      // sports + $ + uuid + $ + collegeid
      const fileName = `sports\$${uuidv4()}\$${localStorage.getItem(
        "collegeId"
      )}.${fileExt}`;
      const tempFile = new File([file], fileName);
      onChangeVal[i][name] = tempFile;
      if (tempFile) {
        const reader = new FileReader();

        reader.onload = () => {
          onChangeVal[i].imgPreview = reader.result;
          forceUpdate();
        };

        reader.readAsDataURL(tempFile);
      }
    } else {
      onChangeVal[i][name] = value;
    }
    setSportsList(onChangeVal);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setSportsList([
      ...sportsList,
      { image: "", more_info: "", imgPreview: "" },
    ]);
    setRemoveData(true);
  };

  const handleRemoveItem = async (sportsId, index) => {
    const loading = toast.loading("Removing Media File...");
    try {
      const tempArray = [...sportsList];
      tempArray.splice(index, 1);
      setSportsList(tempArray);
      toast.dismiss(loading);
      toast.success("Media deleted successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Failed to delete Media, Please try again !!");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
    >
      <Wrapper>
        <div className="gallery-fields">
          {sportsList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {/* <img src={""} alt="" /> */}
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`sport-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`sport-upload-${i}`}
                    name={"image"}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>

                <div className="remove-btn">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.sportsid, i);
                    }}
                  >
                    <IoIosClose />
                  </button>
                </div>
              </div>
              <div className="info-block">
                <textarea
                  placeholder="More Info"
                  value={item.more_info}
                  name="more_info"
                  onChange={(e) => handleChange(e, i)}
                ></textarea>
              </div>
            </GalleryStyle>
          ))}
          <div className="add-sub-cta">
            <button type="button" onClick={handleAddField}>
              Add More ...
            </button>
          </div>
        </div>
        <div className="save-button">
          <button type="submit">Save</button>
        </div>
      </Wrapper>
    </form>
  );
};

export default SportUploadBlock;
